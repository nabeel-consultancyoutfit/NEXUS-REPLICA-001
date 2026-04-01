/**
 * CloneHeroSearchCard — replicates the hero guided-discovery search card on
 * nexusai-db.netlify.app (#hsc.hero-search-card).
 *
 * Behaviour:
 *   idle       → single-line input row with placeholder + send button
 *   active     → card expands, shows 9-step guided questionnaire with progress
 *                dots, inline choice chips, and a free-text fallback input
 *   completing → all 9 steps answered → generates [Guided Search] prompt
 *                and calls onComplete(prompt) to navigate to /ai/chat
 *
 * The user can skip the guided flow at any time by pressing Enter in the
 * free-text input or clicking the "Just chat →" link.
 */
import React, { useState, useRef, useCallback } from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import SendRoundedIcon  from '@mui/icons-material/SendRounded';
import NorthIcon        from '@mui/icons-material/North';
import MicNoneIcon from '@mui/icons-material/MicNone';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import { useComposerEnhancements } from '../../hooks/useComposerEnhancements';

// ─── Step definitions ─────────────────────────────────────────────────────────

interface StepChoice { icon: string; label: string }
interface GuidedStep {
  field:    string;
  question: string;
  sub?:     string;
  choices:  StepChoice[];
}

const GUIDED_STEPS: GuidedStep[] = [
  {
    field:    'task',
    question: 'What do you want to do?',
    sub:      "I'll help you find the perfect AI model.",
    choices: [
      { icon: '✍️', label: 'Write content'    },
      { icon: '💻', label: 'Build something'   },
      { icon: '🖼️', label: 'Create images'    },
      { icon: '📊', label: 'Analyse data'      },
      { icon: '⚡', label: 'Automate work'     },
      { icon: '🔎', label: 'Just exploring'    },
    ],
  },
  {
    field:    'role',
    question: 'What best describes your role?',
    sub:      "This helps me tailor recommendations.",
    choices: [
      { icon: '🎓', label: 'Student'            },
      { icon: '💼', label: 'Professional'       },
      { icon: '🎨', label: 'Creator / Artist'   },
      { icon: '🛠️', label: 'Developer'          },
      { icon: '🚀', label: 'Founder / Business' },
      { icon: '🤔', label: 'Just curious'       },
    ],
  },
  {
    field:    'context',
    question: "What's the context?",
    sub:      "Personal use, work, school — no wrong answers.",
    choices: [
      { icon: '🏠', label: 'Personal project'   },
      { icon: '🏢', label: 'Work / professional' },
      { icon: '📚', label: 'School / academic'  },
      { icon: '💡', label: 'Side hustle'        },
      { icon: '🔬', label: 'Research'           },
      { icon: '🎉', label: 'Just for fun'       },
    ],
  },
  {
    field:    'tone',
    question: 'What tone should the AI use?',
    choices: [
      { icon: '👔', label: 'Professional'        },
      { icon: '😊', label: 'Casual & friendly'   },
      { icon: '⚙️', label: 'Technical'           },
      { icon: '🎭', label: 'Creative'            },
      { icon: '📜', label: 'Formal'              },
      { icon: '💬', label: 'Conversational'      },
    ],
  },
  {
    field:    'format',
    question: 'How should the response be formatted?',
    choices: [
      { icon: '📄', label: 'Plain prose'         },
      { icon: '•', label: 'Bullet points'        },
      { icon: '🔢', label: 'Step-by-step'        },
      { icon: '📊', label: 'Table / comparison'  },
      { icon: '🖥️', label: 'Code / technical'   },
      { icon: '⚡', label: 'Short summary'       },
    ],
  },
  {
    field:    'audience',
    question: "Who's the audience?",
    choices: [
      { icon: '🙋', label: 'Just me'              },
      { icon: '👥', label: 'My team'              },
      { icon: '🌍', label: 'General public'       },
      { icon: '🔬', label: 'Technical audience'  },
      { icon: '🌱', label: 'Non-technical folks'  },
      { icon: '🎓', label: 'Students'             },
    ],
  },
  {
    field:    'depth',
    question: 'How detailed should the response be?',
    choices: [
      { icon: '⚡', label: 'Quick overview'   },
      { icon: '📝', label: 'Moderate detail'  },
      { icon: '🔍', label: 'Deep dive'        },
      { icon: '📚', label: 'Comprehensive'    },
    ],
  },
  {
    field:    'experience',
    question: 'What is your experience level?',
    choices: [
      { icon: '🌱', label: 'Complete beginner'  },
      { icon: '📘', label: 'Some experience'    },
      { icon: '💪', label: 'Intermediate'       },
      { icon: '🏆', label: 'Expert'             },
    ],
  },
  {
    field:    'constraint',
    question: 'Any constraints I should know?',
    sub:      "Last one — almost there!",
    choices: [
      { icon: '⏱️', label: 'Keep it brief'        },
      { icon: '🔤', label: 'Simple language'      },
      { icon: '🎨', label: 'Be creative'         },
      { icon: '🔒', label: 'Keep it safe / PG'  },
      { icon: '✅', label: 'No constraints'      },
    ],
  },
];

// ─── Prompt builder ───────────────────────────────────────────────────────────

function buildPrompt(answers: Record<string, string>): string {
  const {
    task       = 'Just exploring',
    role       = 'a curious person',
    context    = 'general use',
    tone       = 'conversational',
    format     = 'plain prose',
    audience   = 'just me',
    depth      = 'moderate detail',
    experience = 'some experience',
    constraint = 'no constraints',
  } = answers;

  return (
    `[Guided Search] I am ${role}. I want to: ${task}. ` +
    `Context: ${context}. ` +
    `Please respond in a ${tone} tone, formatted as ${format}, ` +
    `aimed at ${audience}. ` +
    `Depth level: ${depth}. ` +
    `My experience: ${experience}. ` +
    `Constraints: ${constraint}.`
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface CloneHeroSearchCardProps {
  /** Called when a prompt is ready — navigate to /ai/chat with it */
  onComplete: (prompt: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CloneHeroSearchCard({ onComplete }: CloneHeroSearchCardProps) {
  const [active,    setActive]    = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers,   setAnswers]   = useState<Record<string, string>>({});
  const [inputText, setInputText] = useState('');
  const [focused,   setFocused]   = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {
    attachments,
    isListening,
    fileInputRef,
    imageInputRef,
    toggleVoiceInput,
    appendFiles,
    openFilePicker,
    openImagePicker,
    removeAttachment,
    clearAttachments,
  } = useComposerEnhancements({
    onAppendText: (text) => {
      setInputText((prev) => `${prev}${prev.trim() ? ' ' : ''}${text}`.trim());
      setActive(true);
      inputRef.current?.focus();
    },
  });

  const totalSteps  = GUIDED_STEPS.length;
  const currentStep = GUIDED_STEPS[stepIndex];

  // ── Activate guided flow ────────────────────────────────────────────────
  const activate = useCallback(() => {
    setActive(true);
  }, []);

  // ── Select a choice ─────────────────────────────────────────────────────
  const handleChoice = useCallback(
    (choice: StepChoice) => {
      const updated = { ...answers, [currentStep.field]: choice.label };
      setAnswers(updated);

      if (stepIndex < totalSteps - 1) {
        setStepIndex((prev) => prev + 1);
      } else {
        // All steps complete
        const prompt = buildPrompt(updated);
        onComplete(prompt);
      }
    },
    [answers, currentStep, stepIndex, totalSteps, onComplete],
  );

  // ── Free-text send ──────────────────────────────────────────────────────
  const handleSend = useCallback(() => {
    const text = inputText.trim();
    const attachmentSummary = attachments.length > 0
      ? `\n\nAttached files: ${attachments.map((file) => file.name).join(', ')}`
      : '';
    if (!text && attachments.length === 0) return;
    onComplete(`${text || 'Please review my attached files.'}${attachmentSummary}`);
    setInputText('');
    clearAttachments();
  }, [attachments, clearAttachments, inputText, onComplete]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Skip guided flow ─────────────────────────────────────────────────────
  const handleSkip = useCallback(() => {
    const text = inputText.trim();
    onComplete(text || 'Hi, I want to explore what NexusAI can do for me!');
  }, [inputText, onComplete]);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <Box
      sx={{
        width:           '100%',
        maxWidth:        640,
        mx:              'auto',
        backgroundColor: CLONE_TOKENS.white,
        borderRadius:    active ? '20px' : '16px',
        border:          `1px solid ${focused ? CLONE_TOKENS.accent : CLONE_TOKENS.border}`,
        boxShadow:       focused
          ? `0 0 0 3px ${CLONE_TOKENS.accentLight}, 0 8px 32px rgba(28,26,22,0.10)`
          : '0 4px 20px rgba(28,26,22,0.08)',
        transition:      'all 0.25s ease',
        overflow:        'hidden',
      }}
    >
      {/* ── Progress dots (only when active) ────────────────────────────── */}
      {active && (
        <Box
          sx={{
            display:    'flex',
            alignItems: 'center',
            gap:        '5px',
            px:         '1.25rem',
            pt:         '1rem',
            pb:         '0.5rem',
          }}
        >
          {GUIDED_STEPS.map((_, idx) => {
            const done   = idx < stepIndex;
            const current = idx === stepIndex;
            return (
              <Box
                key={idx}
                sx={{
                  width:           current ? 18 : done ? 8 : 8,
                  height:          8,
                  borderRadius:    '4px',
                  backgroundColor: done
                    ? CLONE_TOKENS.accent
                    : current
                    ? CLONE_TOKENS.accent
                    : CLONE_TOKENS.bg3,
                  opacity:  done ? 1 : current ? 1 : 0.45,
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
              />
            );
          })}

          <Typography
            sx={{
              ml:        'auto',
              fontSize:  '0.68rem',
              color:     CLONE_TOKENS.text3,
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            {stepIndex + 1} / {totalSteps}
          </Typography>
        </Box>
      )}

      {/* ── Guided step content ──────────────────────────────────────────── */}
      {active && (
        <Box sx={{ px: '1.25rem', pb: '0.75rem' }}>
          <Typography
            sx={{
              fontSize:   '0.9rem',
              fontWeight: 700,
              color:      CLONE_TOKENS.text,
              mb:         currentStep.sub ? '2px' : '0.75rem',
              lineHeight: 1.4,
            }}
          >
            {currentStep.question}
          </Typography>

          {currentStep.sub && (
            <Typography
              sx={{
                fontSize: '0.72rem',
                color:    CLONE_TOKENS.text3,
                mb:       '0.75rem',
              }}
            >
              {currentStep.sub}
            </Typography>
          )}

          {/* Choice chips */}
          <Box
            sx={{
              display:   'flex',
              flexWrap:  'wrap',
              gap:       '0.4rem',
              mb:        '0.85rem',
            }}
          >
            {currentStep.choices.map((choice) => (
              <Box
                key={choice.label}
                onClick={() => handleChoice(choice)}
                sx={{
                  display:         'inline-flex',
                  alignItems:      'center',
                  gap:             '5px',
                  px:              '0.7rem',
                  py:              '0.38rem',
                  borderRadius:    '20px',
                  border:          `1px solid ${CLONE_TOKENS.border}`,
                  backgroundColor: CLONE_TOKENS.bg,
                  cursor:          'pointer',
                  transition:      'all 0.12s ease',
                  userSelect:      'none',
                  '&:hover': {
                    borderColor:     CLONE_TOKENS.accent,
                    backgroundColor: CLONE_TOKENS.accentLight,
                    transform:       'translateY(-1px)',
                    boxShadow:       `0 2px 8px rgba(200,98,42,0.12)`,
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                }}
              >
                <Box component="span" sx={{ fontSize: '0.8rem', lineHeight: 1 }}>
                  {choice.icon}
                </Box>
                <Typography
                  component="span"
                  sx={{
                    fontSize:  '0.76rem',
                    fontWeight: 600,
                    color:     CLONE_TOKENS.text2,
                    lineHeight: 1,
                  }}
                >
                  {choice.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Divider */}
          <Box
            sx={{
              display:    'flex',
              alignItems: 'center',
              gap:        '0.5rem',
              mb:         '0.65rem',
            }}
          >
            <Box sx={{ flex: 1, height: '1px', backgroundColor: CLONE_TOKENS.border }} />
            <Typography sx={{ fontSize: '0.62rem', color: CLONE_TOKENS.text3, fontWeight: 500 }}>
              or type your own
            </Typography>
            <Box sx={{ flex: 1, height: '1px', backgroundColor: CLONE_TOKENS.border }} />
          </Box>
        </Box>
      )}

      {/* ── Input row ────────────────────────────────────────────────────── */}
      <Box
        sx={{
          display:    'flex',
          alignItems: 'flex-end',
          gap:        '8px',
          px:         '0.85rem',
          pb:         '0.75rem',
          pt:         active ? 0 : '0.75rem',
        }}
      >
        <Box
          component="textarea"
          ref={inputRef}
          rows={1}
          value={inputText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => { setFocused(true); activate(); }}
          onBlur={() => setFocused(false)}
          placeholder={
            active
              ? 'Or type anything directly...'
              : "Click here and type anything — or just say hi! 👋"
          }
          sx={{
            flex:         1,
            border:       'none',
            outline:      'none',
            resize:       'none',
            fontFamily:   '"Instrument Sans", "Inter", Arial, sans-serif',
            fontSize:     '0.875rem',
            lineHeight:   1.55,
            color:        CLONE_TOKENS.text,
            backgroundColor: 'transparent',
            '&::placeholder': {
              color:   CLONE_TOKENS.text3,
              opacity: 1,
            },
            minHeight:  '24px',
            maxHeight:  '80px',
            overflowY:  'auto',
          }}
        />

        {!active && (
          <Stack direction="row" spacing={0.25} alignItems="center" sx={{ mr: 0.25 }}>
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
            <IconButton
              onClick={toggleVoiceInput}
              sx={{
                width: 32,
                height: 32,
                color: isListening ? CLONE_TOKENS.accent : CLONE_TOKENS.text3,
                backgroundColor: isListening ? CLONE_TOKENS.accentLight : 'transparent',
              }}
            >
              <MicNoneIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
            <IconButton
              onClick={openFilePicker}
              sx={{ width: 32, height: 32, color: CLONE_TOKENS.text3 }}
            >
              <AttachFileOutlinedIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
            <IconButton
              onClick={openImagePicker}
              sx={{ width: 32, height: 32, color: CLONE_TOKENS.text3 }}
            >
              <ImageOutlinedIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
          </Stack>
        )}

        <IconButton
          onClick={handleSend}
          sx={{
            width:           36,
            height:          36,
            borderRadius:    '10px',
            flexShrink:      0,
            backgroundColor: inputText.trim() ? CLONE_TOKENS.accent : CLONE_TOKENS.bg2,
            color:           inputText.trim() ? '#fff' : CLONE_TOKENS.text3,
            transition:      'all 0.15s ease',
            '&:hover': {
              backgroundColor: inputText.trim() ? CLONE_TOKENS.accentDark : CLONE_TOKENS.bg3,
            },
          }}
        >
          {active
            ? <NorthIcon     sx={{ fontSize: '0.9rem' }} />
            : <SendRoundedIcon sx={{ fontSize: '0.9rem' }} />
          }
        </IconButton>
      </Box>

      {attachments.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            px: '0.85rem',
            pb: active ? '0.65rem' : '0.75rem',
          }}
        >
          {attachments.map((file, index) => (
            <Box
              key={`${file.name}-${index}`}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                px: '0.65rem',
                py: '0.35rem',
                borderRadius: '999px',
                border: `1px solid ${CLONE_TOKENS.border}`,
                backgroundColor: CLONE_TOKENS.bg,
                maxWidth: 220,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.7rem',
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
                  fontSize: '0.8rem',
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

      {/* ── Footer: skip link (active only) ─────────────────────────────── */}
      {active && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px:             '1.25rem',
            py:             '0.55rem',
            borderTop:      `1px solid ${CLONE_TOKENS.border}`,
            backgroundColor: CLONE_TOKENS.bg,
          }}
        >
          <Typography
            sx={{
              fontSize:  '0.65rem',
              color:     CLONE_TOKENS.text3,
              fontStyle: 'italic',
            }}
          >
            ✦ {totalSteps - stepIndex} question{totalSteps - stepIndex !== 1 ? 's' : ''} left
          </Typography>
          <Typography
            component="span"
            onClick={handleSkip}
            sx={{
              fontSize:  '0.72rem',
              fontWeight: 600,
              color:     CLONE_TOKENS.accent,
              cursor:    'pointer',
              transition: 'opacity 0.12s ease',
              '&:hover': { opacity: 0.75, textDecoration: 'underline' },
            }}
          >
            Just chat →
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
