/**
 * useChatSimulation — state machine for the NexusAI Chat Hub simulation.
 *
 * Manages the full guided discovery flow:
 *   welcome → guided_step_1 → guided_step_2 → guided_step_3
 *   → prompt_generating → prompt_ready → free_chat
 *
 * All responses are loaded from local mock files.
 * Future upgrade: replace mock loaders with real API calls.
 */
import { useState, useCallback } from 'react';
import {
  GUIDED_STEP_1,
  GUIDED_STEP_2,
  GUIDED_STEP_3,
  TASK_INTROS,
  STEP1_ACKS,
  STEP2_ACKS,
  generatePrompt,
} from '../mock/chat-flows';
import {
  matchResponseCategory,
  getNextResponse,
  formatAgentResponse,
} from '../mock/agent-responses';
import { CLONE_MOCK_MODELS } from '../mock';
import type { ChatItem, ChatPhase, ChatFlowChoice } from '../types';

// ─── Helpers ────────────────────────────────────────────────────────────────

let _counter = 0;
function uid(): string {
  _counter++;
  return `ci-${Date.now()}-${_counter}`;
}

function ts(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function makeAiText(
  content: string,
  statusLabel?: string,
): ChatItem {
  return { id: uid(), type: 'ai_text', timestamp: ts(), content, statusLabel };
}

function makeUserText(content: string): ChatItem {
  return { id: uid(), type: 'user_text', timestamp: ts(), content };
}

function makeUserBadge(icon: string, label: string): ChatItem {
  return { id: uid(), type: 'user_badge', timestamp: ts(), badgeIcon: icon, badgeLabel: label };
}

function getRecommendedModelIds(text: string, selectedTask: string | null): string[] {
  const query = `${selectedTask ?? ''} ${text}`.toLowerCase();

  if (query.includes('image') || query.includes('design') || query.includes('art')) {
    return ['flux-1-1-pro', 'gpt-4o', 'gemini-2-5-pro'];
  }

  if (query.includes('code') || query.includes('app') || query.includes('website') || query.includes('build')) {
    return ['gpt-5', 'claude-opus-4-6', 'mistral-large-3'];
  }

  if (query.includes('research') || query.includes('analyse') || query.includes('analyze') || query.includes('data')) {
    return ['o3', 'gpt-5', 'gemini-2-5-pro'];
  }

  return CLONE_MOCK_MODELS.slice(0, 3).map((model) => model.id);
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export interface ChatSimulationReturn {
  items:            ChatItem[];
  phase:            ChatPhase;
  isTyping:         boolean;
  typingStatus:     string;
  selectedTask:     string | null;
  selectedAudience: string | null;
  selectedExp:      string | null;
  selectedBudget:   string | null;
  recommendationShown: boolean;
  /** User clicks one of the 6 welcome task cards */
  handleTaskSelect:   (icon: string, label: string) => void;
  /** User selects an option inside a choice card */
  handleChoiceSelect: (stepNum: 1 | 2 | 3, choice: ChatFlowChoice) => void;
  /** User clicks "Run prompt" on the prompt card */
  handleRunPrompt:    (promptText: string) => void;
  /** User clicks "Regenerate" on the prompt card */
  handleRegenerate:   () => void;
  /** User clicks "Delete" on the prompt card */
  handleDeletePrompt: (itemId: string) => void;
  /** User sends a free-form text message */
  handleSendText:     (text: string) => void;
  /** User clicks Proceed on a recommended model */
  handleProceedModel: (modelId: string) => void;
}

export function useChatSimulation(): ChatSimulationReturn {
  const [items,            setItems]            = useState<ChatItem[]>([]);
  const [phase,            setPhase]            = useState<ChatPhase>('welcome');
  const [isTyping,         setIsTyping]         = useState(false);
  const [typingStatus,     setTypingStatus]     = useState('NexusAI Hub · thinking');
  const [selectedTask,     setSelectedTask]     = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  const [selectedExp,      setSelectedExp]      = useState<string | null>(null);
  const [selectedBudget,   setSelectedBudget]   = useState<string | null>(null);
  const [freeChatTurns,    setFreeChatTurns]    = useState(0);
  const [recommendationShown, setRecommendationShown] = useState(false);

  // ── Internal: append items after a simulated delay ───────────────────────

  const showTypingThen = useCallback(
    (
      statusLabel: string,
      delayMs: number,
      callback: () => void,
    ) => {
      setIsTyping(true);
      setTypingStatus(statusLabel);
      setTimeout(() => {
        setIsTyping(false);
        callback();
      }, delayMs);
    },
    [],
  );

  // ── Disable the last active choice card for a given step ─────────────────

  const disableChoiceCard = useCallback((stepNum: 1 | 2 | 3, selectedLabel: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.type !== 'choice_card') return item;
        const isStep1 = stepNum === 1 && item.flowStep === GUIDED_STEP_1;
        const isStep2 = stepNum === 2 && item.flowStep === GUIDED_STEP_2;
        const isStep3 = stepNum === 3 && item.flowStep === GUIDED_STEP_3;
        if (isStep1 || isStep2 || isStep3) {
          return { ...item, choiceDisabled: true, selectedChoice: selectedLabel };
        }
        return item;
      }),
    );
  }, []);

  // ── Task selection (welcome → guided_step_1) ──────────────────────────────

  const handleTaskSelect = useCallback(
    (icon: string, label: string) => {
      if (phase !== 'welcome') return;

      const badgeItem = makeUserBadge(icon, label);
      setItems([badgeItem]);
      setSelectedTask(label);

      showTypingThen('NexusAI Hub · guided setup', 1000, () => {
        const intro    = TASK_INTROS[label] ?? `Great choice! Let's find the best AI for "${label}".\n\nNow, quick question:`;
        const textItem = makeAiText(intro, 'NexusAI Hub · guided setup');
        const stepItem: ChatItem = {
          id:       uid(),
          type:     'choice_card',
          timestamp: ts(),
          flowStep: GUIDED_STEP_1,
        };
        setItems((prev) => [...prev, textItem, stepItem]);
        setPhase('guided_step_1');
      });
    },
    [phase, showTypingThen],
  );

  // ── Choice selection ───────────────────────────────────────────────────────

  const handleChoiceSelect = useCallback(
    (stepNum: 1 | 2 | 3, choice: ChatFlowChoice) => {
      // Disable the card and append the user badge
      disableChoiceCard(stepNum, choice.label);
      const badge = makeUserBadge(choice.icon, choice.label);
      setItems((prev) => [...prev, badge]);

      if (stepNum === 1) {
        // Save audience + advance to step 2
        setSelectedAudience(choice.label);
        showTypingThen('NexusAI Hub · guided setup', 900, () => {
          const ack  = STEP1_ACKS[choice.label] ?? `Got it — "${choice.label}".\n\nOne more:`;
          const text = makeAiText(ack, 'NexusAI Hub · guided setup');
          const step: ChatItem = {
            id:       uid(),
            type:     'choice_card',
            timestamp: ts(),
            flowStep: GUIDED_STEP_2,
          };
          setItems((prev) => [...prev, text, step]);
          setPhase('guided_step_2');
        });
      } else if (stepNum === 2) {
        // Save experience + advance to step 3
        setSelectedExp(choice.label);
        showTypingThen('NexusAI Hub · guided setup', 900, () => {
          const ack  = STEP2_ACKS[choice.label] ?? `Got it — "${choice.label}".\n\nLast question:`;
          const text = makeAiText(ack, 'NexusAI Hub · guided setup');
          const step: ChatItem = {
            id:       uid(),
            type:     'choice_card',
            timestamp: ts(),
            flowStep: GUIDED_STEP_3,
          };
          setItems((prev) => [...prev, text, step]);
          setPhase('guided_step_3');
        });
      } else if (stepNum === 3) {
        // Save budget + generate prompt
        setSelectedBudget(choice.label);
        setPhase('prompt_generating');
        showTypingThen('NexusAI Hub · building prompt', 2200, () => {
          setSelectedBudget((budget) => {
            setSelectedTask((task) => {
              setSelectedAudience((audience) => {
                setSelectedExp((exp) => {
                  const promptText = generatePrompt(
                    task     ?? 'Just exploring',
                    audience ?? 'Just me',
                    exp      ?? 'Some experience',
                    choice.label,
                  );
                  const intro = makeAiText(
                    "Here's a personalised prompt crafted from your answers. You can run it as-is, edit it, regenerate a new version, or delete it and type your own. 👇",
                    'NexusAI Hub · prompt ready',
                  );
                  const promptCard: ChatItem = {
                    id:         uid(),
                    type:       'prompt_card',
                    timestamp:  ts(),
                    promptText,
                  };
                  setItems((prev) => [...prev, intro, promptCard]);
                  setPhase('prompt_ready');
                  return exp;
                });
                return audience;
              });
              return task;
            });
            return budget;
          });
        });
      }
    },
    [disableChoiceCard, showTypingThen],
  );

  // ── Run prompt (transitions to free_chat) ─────────────────────────────────

  const handleRunPrompt = useCallback(
    (promptText: string) => {
      const userMsg = makeUserText(promptText);
      setItems((prev) => [...prev, userMsg]);
      setPhase('free_chat');

      showTypingThen('NexusAI Hub · thinking', 1500, () => {
        const cat      = matchResponseCategory(promptText);
        const mockResp = getNextResponse(cat);
        const aiText   = formatAgentResponse(mockResp);
        const aiMsg    = makeAiText(aiText, `NexusAI Hub · ${mockResp.agent}`);
        setItems((prev) => [...prev, aiMsg]);
      });
    },
    [showTypingThen],
  );

  // ── Regenerate prompt ─────────────────────────────────────────────────────

  const handleRegenerate = useCallback(() => {
    setPhase('prompt_generating');
    showTypingThen('NexusAI Hub · building prompt', 2000, () => {
      setSelectedTask((task) => {
        setSelectedAudience((audience) => {
          setSelectedExp((exp) => {
            setSelectedBudget((budget) => {
              const newPrompt = generatePrompt(
                task     ?? 'Just exploring',
                audience ?? 'Just me',
                exp      ?? 'Some experience',
                budget   ?? 'Pay as I go',
              ) + '\n\n[Regenerated version — feel free to further customise.]';

              setItems((prev) =>
                prev.map((item) =>
                  item.type === 'prompt_card' && !item.promptDismissed
                    ? { ...item, promptText: newPrompt }
                    : item,
                ),
              );
              setPhase('prompt_ready');
              return budget;
            });
            return exp;
          });
          return audience;
        });
        return task;
      });
    });
  }, [showTypingThen]);

  // ── Delete prompt ─────────────────────────────────────────────────────────

  const handleDeletePrompt = useCallback((itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, promptDismissed: true } : item,
      ),
    );
    setPhase('free_chat');
  }, []);

  // ── Free-form text send ───────────────────────────────────────────────────

  const handleSendText = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      if (phase === 'welcome') {
        // Treat as task-less free text — jump straight to free_chat
        setPhase('free_chat');
      }

      const userMsg = makeUserText(text);
      setItems((prev) => [...prev, userMsg]);

      showTypingThen('NexusAI Hub · thinking', 1200 + Math.random() * 600, () => {
        const cat      = matchResponseCategory(text);
        const mockResp = getNextResponse(cat);
        const aiText   = formatAgentResponse(mockResp);
        const aiMsg    = makeAiText(aiText, `NexusAI Hub · ${mockResp.agent}`);
        setFreeChatTurns((prevTurns) => {
          const nextTurns = prevTurns + 1;
          const shouldShowRecommendation = !recommendationShown && nextTurns >= 2;

          setItems((prev) => {
            const nextItems = [...prev, aiMsg];

            if (shouldShowRecommendation) {
              nextItems.push({
                id: uid(),
                type: 'model_recommendation',
                timestamp: ts(),
                recommendationIntro: 'Great question! Here are the most relevant models based on what you said. Tap any card to explore, or click "Proceed" to simulate selecting it.',
                recommendationModelIds: getRecommendedModelIds(text, selectedTask),
              });
            }

            return nextItems;
          });

          if (shouldShowRecommendation) {
            setRecommendationShown(true);
          }

          return nextTurns;
        });
      });
    },
    [phase, recommendationShown, selectedTask, showTypingThen],
  );

  const handleProceedModel = useCallback(
    (modelId: string) => {
      const model = CLONE_MOCK_MODELS.find((entry) => entry.id === modelId);
      if (!model) return;

      setItems((prev) => [
        ...prev,
        makeUserText(`Proceed with ${model.name}`),
      ]);

      showTypingThen(`NexusAI Hub · ${model.name} overview`, 900, () => {
        const intro = makeAiText(
          `Before we pick a version of ${model.name}, here are helpful questions people ask. Tap any to learn more, or continue to select a version. 👇`,
          `NexusAI Hub · ${model.name} overview`,
        );

        const followup: ChatItem = {
          id: uid(),
          type: 'model_followup',
          timestamp: ts(),
          followupModelId: modelId,
        };

        setItems((prev) => [...prev, intro, followup]);
      });
    },
    [showTypingThen],
  );

  return {
    items,
    phase,
    isTyping,
    typingStatus,
    selectedTask,
    selectedAudience,
    selectedExp,
    selectedBudget,
    recommendationShown,
    handleTaskSelect,
    handleChoiceSelect,
    handleRunPrompt,
    handleRegenerate,
    handleDeletePrompt,
    handleSendText,
    handleProceedModel,
  };
}
