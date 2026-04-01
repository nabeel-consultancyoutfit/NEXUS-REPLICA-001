/**
 * CloneChatPage — replicates the Chat Hub at nexusai-db.netlify.app.
 *
 * Chat phases:
 *   welcome          → 6 task cards + input bar
 *   guided_step_1–3  → AI Q&A cards (WHO IT'S FOR / EXPERIENCE / BUDGET)
 *   prompt_generating → typing indicator
 *   prompt_ready      → generated AI prompt card with actions
 *   free_chat         → standard conversational chat
 *
 * All responses are simulated via useChatSimulation hook.
 * Future: replace hook internals with real ML API calls.
 *
 * Layout host (CloneAppLayout) provides:
 *   • Left sidebar  (CloneSidebar  — model list)
 *   • Right panel   (CloneRightPanel — quick actions)
 *   This component fills the centre column only.
 */
import React, { useRef, useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Stack,
  InputBase, IconButton,
} from '@mui/material';
import SendRoundedIcon        from '@mui/icons-material/SendRounded';
import MicNoneIcon            from '@mui/icons-material/MicNone';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import VideocamOutlinedIcon   from '@mui/icons-material/VideocamOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import ImageOutlinedIcon      from '@mui/icons-material/ImageOutlined';
import AddCircleOutlineIcon   from '@mui/icons-material/AddCircleOutline';

import { CLONE_TOKENS }          from '@/theme/clone-theme';
import CloneChatBubble           from '../../components/CloneChatBubble';
import CloneChoiceCard           from '../../components/CloneChoiceCard';
import CloneTypingIndicator      from '../../components/CloneTypingIndicator';
import ClonePromptCard           from '../../components/ClonePromptCard';
import CloneUserBadge            from '../../components/CloneUserBadge';
import CloneModelRecommendationCard from '../../components/CloneModelRecommendationCard';
import CloneModelFollowupCard from '../../components/CloneModelFollowupCard';
import { useChatSimulation }     from '../../hooks/useChatSimulation';
import { useComposerEnhancements } from '../../hooks/useComposerEnhancements';
import { GUIDED_STEP_1, GUIDED_STEP_2, GUIDED_STEP_3 } from '../../mock/chat-flows';
import type { ChatFlowChoice }   from '../../types';

// ─── Static data ─────────────────────────────────────────────────────────────

const TASK_OPTIONS = [
  { icon: '✍️', label: 'Write content',   sub: 'Emails, posts, stories'    },
  { icon: '🖼️', label: 'Create images',   sub: 'Art, photos, designs'      },
  { icon: '🔧', label: 'Build something', sub: 'Apps, tools, websites'     },
  { icon: '⚡', label: 'Automate work',   sub: 'Save hours every week'     },
  { icon: '📊', label: 'Analyse data',    sub: 'PDFs, sheets, reports'     },
  { icon: '🔎', label: 'Just exploring',  sub: "Show me what's possible"   },
];

const PROMPT_CHIPS = [
  'Use cases',
  'Monitor the situation',
  'Create a prototype',
  'Build a business plan',
  'Create content',
  'Analyse & research',
  'Learn something',
];

const CHIP_SUGGESTIONS: Record<string, string> = {
  'Use cases':             'Help me find the best AI model for my project',
  'Monitor the situation': 'I want to monitor AI trends and competitor launches',
  'Create a prototype':    'I want to build an AI chatbot for my website',
  'Build a business plan': 'Create a business plan for an AI consulting agency',
  'Create content':        'Write a landing page for my new AI tool',
  'Analyse & research':    'Analyse documents and extract key information',
  'Learn something':       'Explain prompt engineering in simple terms',
};

const COMPOSER_ICONS = [
  { Icon: MicNoneIcon,            title: 'Voice input'    },
  { Icon: WorkspacesOutlinedIcon, title: 'Upload file'    },
  { Icon: VideocamOutlinedIcon,   title: 'Video'          },
  { Icon: ChatBubbleOutlinedIcon, title: 'Screen share'   },
  { Icon: AttachFileOutlinedIcon, title: 'Attach file'    },
  { Icon: ImageOutlinedIcon,      title: 'Upload image'   },
  { Icon: AddCircleOutlineIcon,   title: 'More options'   },
];

// ─── Component ───────────────────────────────────────────────────────────────

interface CloneChatPageProps {
  selectedModelId?: string;
  onSelectModel?: (modelId: string) => void;
  onProceedModel?: (modelId: string) => void;
  /** If set, this prompt is sent automatically when the page mounts */
  initialPrompt?:   string;
}

export default function CloneChatPage({
  selectedModelId = 'gpt-5',
  onSelectModel,
  onProceedModel,
  initialPrompt,
}: CloneChatPageProps) {
  const {
    items,
    phase,
    isTyping,
    typingStatus,
    handleTaskSelect,
    handleChoiceSelect,
    handleRunPrompt,
    handleRegenerate,
    handleDeletePrompt,
    handleSendText,
    handleProceedModel,
  } = useChatSimulation();

  const [inputText,  setInputText]  = useState('');
  const [activeChip, setActiveChip] = useState('');
  const [isFocused,  setIsFocused]  = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const {
    attachments,
    isListening,
    browserSpeechSupported,
    fileInputRef,
    imageInputRef,
    toggleVoiceInput,
    appendFiles,
    openFilePicker,
    openImagePicker,
    removeAttachment,
    clearAttachments,
  } = useComposerEnhancements({
    onAppendText: (text) => setInputText((prev) => `${prev}${prev.trim() ? ' ' : ''}${text}`.trim()),
  });

  // Auto-send initial prompt from homepage guided-discovery flow
  useEffect(() => {
    if (initialPrompt?.trim()) {
      handleSendText(initialPrompt.trim());
    }
    // Only fire on mount — intentionally omitting initialPrompt from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll on new items
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [items, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitText();
    }
  };

  const submitText = () => {
    if (!inputText.trim() && attachments.length === 0) return;
    const attachmentSummary = attachments.length > 0
      ? `\n\nAttached files: ${attachments.map((file) => file.name).join(', ')}`
      : '';
    handleSendText(`${inputText.trim() || 'Please review my attached files.'}${attachmentSummary}`);
    setInputText('');
    setActiveChip(''); // clear chip highlight after every send
    clearAttachments();
  };

  const handleChipClick = (chip: string) => {
    setActiveChip(chip);
    const suggestion = CHIP_SUGGESTIONS[chip];
    if (suggestion) setInputText(suggestion);
  };

  // Determine which step a choice_card belongs to
  const getStepNum = (flowStep: typeof GUIDED_STEP_1): 1 | 2 | 3 => {
    if (flowStep === GUIDED_STEP_1) return 1;
    if (flowStep === GUIDED_STEP_2) return 2;
    return 3;
  };

  // Whether a choice_card is still interactive (based on phase)
  const isChoiceActive = (stepNum: 1 | 2 | 3): boolean => {
    if (stepNum === 1) return phase === 'guided_step_1';
    if (stepNum === 2) return phase === 'guided_step_2';
    if (stepNum === 3) return phase === 'guided_step_3';
    return false;
  };

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <Box
      sx={{
        display:         'flex',
        flexDirection:   'column',
        height:          `calc(100vh - ${CLONE_TOKENS.navbarHeight}px)`,
        backgroundColor: CLONE_TOKENS.bg,
      }}
    >
      {/* ── Message area ──────────────────────────────────────────────── */}
      <Box
        sx={{
          flex:      1,
          overflowY: 'auto',
          px:        { xs: 1.5, md: '2rem' },
          py:        '1.25rem',
        }}
      >
        {/* Welcome state */}
        {phase === 'welcome' && items.length === 0 && (
          <Box sx={{ maxWidth: 860, mx: 'auto', mt: { xs: 1, md: 2.5 } }}>
            <Box
              sx={{
                maxWidth:        520,
                mx:              'auto',
                backgroundColor: CLONE_TOKENS.white,
                borderRadius:    '24px',
                border:          `1px solid rgba(56, 46, 35, 0.08)`,
                p:               { xs: 2, md: 2.5 },
                textAlign:       'center',
                boxShadow:       '0 12px 32px rgba(28, 26, 22, 0.10), 0 2px 8px rgba(28, 26, 22, 0.05)',
              }}
            >
              {/* Plus icon */}
              <Box
                sx={{
                  width:           34,
                  height:          34,
                  mx:              'auto',
                  mb:              1.75,
                  borderRadius:    '50%',
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  backgroundColor: '#F8EDE7',
                  color:           '#8F5A2A',
                  border:          '1px solid rgba(200,98,42,0.12)',
                  fontSize:        '1.1rem',
                  fontWeight:      700,
                }}
              >
                +
              </Box>

              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 700,
                  color:      CLONE_TOKENS.text,
                  mb:         1,
                }}
              >
                Welcome! I&apos;m here to help you 👋
              </Typography>

              <Typography
                sx={{
                  fontSize:  '0.82rem',
                  color:     CLONE_TOKENS.text2,
                  lineHeight: 1.65,
                  mb:        2.25,
                  maxWidth:  420,
                  mx:        'auto',
                }}
              >
                No tech background needed. Tell me what you&apos;d like to{' '}
                <Box component="span" sx={{ fontWeight: 700, color: CLONE_TOKENS.text }}>
                  achieve
                </Box>{' '}
                — I&apos;ll help you discover what&apos;s possible, step by step.
              </Typography>

              {/* Task grid */}
              <Box
                sx={{
                  p:               1.1,
                  borderRadius:    '14px',
                  border:          `1px solid ${CLONE_TOKENS.border}`,
                  backgroundColor: '#F7F3EE',
                }}
              >
                <Typography
                  sx={{
                    fontSize:      '0.68rem',
                    fontWeight:    700,
                    color:         CLONE_TOKENS.accent,
                    mb:            1.1,
                    letterSpacing: '0.05em',
                    textAlign:     'left',
                  }}
                >
                  ✦ WHAT WOULD YOU LIKE TO DO TODAY?
                </Typography>
                <Grid container spacing={1}>
                  {TASK_OPTIONS.map(({ icon, label, sub }) => (
                    <Grid key={label} item xs={6}>
                      <Box
                        onClick={() => handleTaskSelect(icon, label)}
                        sx={{
                          p:               '0.9rem',
                          minHeight:       92,
                          borderRadius:    '12px',
                          border:          `1px solid ${CLONE_TOKENS.border}`,
                          backgroundColor: CLONE_TOKENS.white,
                          cursor:          'pointer',
                          textAlign:       'left',
                          transition:      'all 0.15s ease',
                          '&:hover':       {
                            borderColor: CLONE_TOKENS.accent,
                            boxShadow:   '0 6px 18px rgba(200,98,42,0.10)',
                            transform:   'translateY(-1px)',
                          },
                        }}
                      >
                        <Box sx={{ fontSize: '1.1rem', mb: 0.5 }}>{icon}</Box>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: CLONE_TOKENS.text, mb: '2px' }}>
                          {label}
                        </Typography>
                        <Typography sx={{ fontSize: '0.66rem', color: CLONE_TOKENS.text3, lineHeight: 1.35 }}>
                          {sub}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Typography sx={{ fontSize: '0.72rem', color: CLONE_TOKENS.text3, mt: 1.25 }}>
                Or type anything below — there are no wrong answers ↓
              </Typography>
            </Box>
          </Box>
        )}

        {/* Chat items */}
        {items.length > 0 && (
          <Box sx={{ maxWidth: 720, mx: 'auto' }}>
            {items.map((item) => {
              // Skip dismissed prompt cards
              if (item.type === 'prompt_card' && item.promptDismissed) return null;

              if (item.type === 'user_badge') {
                return (
                  <CloneUserBadge
                    key={item.id}
                    icon={item.badgeIcon}
                    label={item.badgeLabel ?? ''}
                  />
                );
              }

              if (item.type === 'ai_text') {
                return (
                  <CloneChatBubble
                    key={item.id}
                    role="assistant"
                    content={item.content ?? ''}
                    statusLabel={item.statusLabel}
                    timestamp={item.timestamp}
                  />
                );
              }

              if (item.type === 'user_text') {
                return (
                  <CloneChatBubble
                    key={item.id}
                    role="user"
                    content={item.content ?? ''}
                    timestamp={item.timestamp}
                  />
                );
              }

              if (item.type === 'choice_card' && item.flowStep) {
                const stepNum  = getStepNum(item.flowStep);
                const active   = isChoiceActive(stepNum) && !item.choiceDisabled;
                return (
                  <CloneChoiceCard
                    key={item.id}
                    flowStep={item.flowStep}
                    onSelect={
                      active
                        ? (choice: ChatFlowChoice) => handleChoiceSelect(stepNum, choice)
                        : undefined
                    }
                    selectedChoice={item.selectedChoice}
                  />
                );
              }

              if (item.type === 'prompt_card' && item.promptText) {
                return (
                  <ClonePromptCard
                    key={item.id}
                    promptText={item.promptText}
                    onRun={handleRunPrompt}
                    onRegenerate={handleRegenerate}
                    onDelete={() => handleDeletePrompt(item.id)}
                  />
                );
              }

              if (item.type === 'model_recommendation' && item.recommendationModelIds) {
                return (
                  <CloneModelRecommendationCard
                    key={item.id}
                    intro={item.recommendationIntro}
                    modelIds={item.recommendationModelIds}
                    onProceedModel={(modelId) => {
                      onProceedModel?.(modelId);
                      handleProceedModel(modelId);
                    }}
                  />
                );
              }

              if (item.type === 'model_followup' && item.followupModelId) {
                return (
                  <CloneModelFollowupCard
                    key={item.id}
                    modelId={item.followupModelId}
                  />
                );
              }

              return null;
            })}

            {/* Typing indicator */}
            {isTyping && <CloneTypingIndicator statusLabel={typingStatus} />}
          </Box>
        )}

        {/* Typing indicator in welcome phase */}
        {phase === 'welcome' && isTyping && (
          <Box sx={{ maxWidth: 720, mx: 'auto', mt: 2 }}>
            <CloneTypingIndicator statusLabel={typingStatus} />
          </Box>
        )}

        {/* Always-present scroll anchor — must stay outside conditionals */}
        <div ref={bottomRef} />
      </Box>

      {/* ── Input area ────────────────────────────────────────────────── */}
      <Box
        sx={{
          backgroundColor: 'transparent',
          px:              { xs: 2, md: '2.5rem' },
          pt:              1.35,
          pb:              2,
          flexShrink:      0,
        }}
      >
        <Box
          sx={{
            maxWidth:        860,
            mx:              'auto',
            border:          `1px solid ${isFocused ? CLONE_TOKENS.accent : '#D8D1C9'}`,
            borderRadius:    '12px',
            backgroundColor: CLONE_TOKENS.white,
            boxShadow:       isFocused
              ? `0 0 0 3px ${CLONE_TOKENS.accentLight}, 0 1px 2px rgba(28,26,22,0.04)`
              : '0 1px 2px rgba(28,26,22,0.04)',
            transition:      'border-color 0.15s ease, box-shadow 0.15s ease',
            overflow:        'hidden',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={(e) => {
              appendFiles(e.target.files);
              e.currentTarget.value = '';
            }}
          />
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => {
              appendFiles(e.target.files);
              e.currentTarget.value = '';
            }}
          />
          {/* Text input row */}
          <Box
            sx={{
              display:     'flex',
              alignItems:  'flex-start',
              gap:         1.25,
              px:          '0.85rem',
              pt:          '0.75rem',
              pb:          '0.4rem',
            }}
          >
            <InputBase
              multiline
              minRows={1}
              maxRows={5}
              fullWidth
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe your project, ask a question, or just say hi — I'm here to help..."
              sx={{
                fontSize:   '0.875rem',
                lineHeight: 1.55,
                color:      CLONE_TOKENS.text,
                '& textarea': { resize: 'none' },
                '& input::placeholder, & textarea::placeholder': {
                  color:   CLONE_TOKENS.text3,
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Toolbar row */}
          <Box
            sx={{
              display:    'flex',
              alignItems: 'center',
              px:         '0.5rem',
              pb:         '0.5rem',
              gap:        '2px',
            }}
          >
            {/* Composer tool icons */}
            {COMPOSER_ICONS.map(({ Icon, title }) => (
              <IconButton
                key={title}
                title={title}
                size="small"
                onClick={() => {
                  if (title === 'Voice input' && browserSpeechSupported) toggleVoiceInput();
                  if (title === 'Upload file' || title === 'Attach file') openFilePicker();
                  if (title === 'Upload image') openImagePicker();
                }}
                sx={{
                  color:     title === 'Voice input' && isListening ? CLONE_TOKENS.accent : CLONE_TOKENS.text3,
                  p:         '5px',
                  borderRadius: '6px',
                  backgroundColor: title === 'Voice input' && isListening ? CLONE_TOKENS.accentLight : 'transparent',
                  '&:hover': { color: CLONE_TOKENS.text2, backgroundColor: CLONE_TOKENS.bg2 },
                }}
              >
                <Icon sx={{ fontSize: '1rem' }} />
              </IconButton>
            ))}

            {/* Model selector */}
            <Box sx={{ flex: 1 }} />
            <Box
              sx={{
                display:         'flex',
                alignItems:      'center',
                gap:             '4px',
                px:              '0.55rem',
                py:              '3px',
                borderRadius:    '6px',
                backgroundColor: CLONE_TOKENS.bg,
                border:          `1px solid ${CLONE_TOKENS.border}`,
                cursor:          'pointer',
                mr:              '4px',
              }}
            >
              <Typography sx={{ fontSize: '0.68rem', fontWeight: 600, color: CLONE_TOKENS.text2 }}>
                {selectedModelId === 'gpt-5' ? 'GPT-5' : selectedModelId.toUpperCase()}
              </Typography>
              <Typography sx={{ fontSize: '0.6rem', color: CLONE_TOKENS.text3 }}>▾</Typography>
            </Box>

            {/* Send button */}
            <IconButton
              onClick={submitText}
              sx={{
                width:           32,
                height:          32,
                borderRadius:    '8px',
                backgroundColor: inputText.trim() ? CLONE_TOKENS.accent : CLONE_TOKENS.bg2,
                color:           inputText.trim() ? '#fff' : CLONE_TOKENS.text3,
                transition:      'all 0.15s ease',
                '&:hover':       {
                  backgroundColor: inputText.trim() ? CLONE_TOKENS.accentDark : CLONE_TOKENS.bg3,
                },
              }}
            >
              <SendRoundedIcon sx={{ fontSize: '0.9rem' }} />
            </IconButton>
          </Box>
        </Box>

        {attachments.length > 0 && (
          <Box
            sx={{
              maxWidth: 860,
              mx: 'auto',
              mt: '0.55rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.45rem',
            }}
          >
            {attachments.map((file, index) => (
              <Box
                key={`${file.name}-${index}`}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  px: '0.7rem',
                  py: '0.35rem',
                  borderRadius: '999px',
                  border: `1px solid ${CLONE_TOKENS.border}`,
                  backgroundColor: CLONE_TOKENS.white,
                  maxWidth: 220,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.72rem',
                    color: CLONE_TOKENS.text2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {file.name}
                </Typography>
                <Box
                  component="button"
                  type="button"
                  onClick={() => removeAttachment(index)}
                  sx={{
                    border: 'none',
                    background: 'transparent',
                    color: CLONE_TOKENS.text3,
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    lineHeight: 1,
                    p: 0,
                  }}
                >
                  ×
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Prompt category chips — visible only during welcome / before first send */}
        <Box
          sx={{
            maxWidth:  860,
            mx:        'auto',
            mt:        '0.6rem',
            overflowX: 'auto',
            display:   phase === 'welcome' ? 'flex' : 'none',
            gap:       '0.5rem',
            pb:        '2px',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {PROMPT_CHIPS.map((chip) => (
            <Box
              key={chip}
              onClick={() => handleChipClick(chip)}
              sx={{
                display:         'inline-flex',
                alignItems:      'center',
                px:              '0.75rem',
                py:              '0.3rem',
                borderRadius:    '20px',
                border:          `1px solid ${activeChip === chip ? CLONE_TOKENS.accent : CLONE_TOKENS.border}`,
                backgroundColor: activeChip === chip ? '#FDF1EB' : CLONE_TOKENS.white,
                cursor:          'pointer',
                whiteSpace:      'nowrap',
                flexShrink:      0,
                transition:      'all 0.12s ease',
                '&:hover':       {
                  borderColor:     CLONE_TOKENS.accent,
                  backgroundColor: '#FDF1EB',
                },
              }}
            >
              <Typography
                sx={{
                  fontSize:  '0.72rem',
                  fontWeight: activeChip === chip ? 700 : 500,
                  color:     activeChip === chip ? CLONE_TOKENS.accent : CLONE_TOKENS.text2,
                }}
              >
                {chip}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
