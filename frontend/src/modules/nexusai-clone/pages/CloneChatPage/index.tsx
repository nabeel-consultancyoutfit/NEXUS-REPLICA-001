/**
 * CloneChatPage — replicates the Chat Hub page at nexusai-db.netlify.app.
 *
 * Layout (CloneAppLayout wraps this):
 *   Left sidebar: model list (CloneSidebar via layout)
 *   Center: welcome card → task grid → message thread → input area + prompt chips
 *   Right panel: quick actions (CloneRightPanel via layout)
 */
import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Grid, Stack, Button, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import CloneChatBubble from '../../components/CloneChatBubble';
import { CLONE_MOCK_MODELS } from '../../mock';
import type { CloneChatMessage } from '../../types';

const TASK_OPTIONS = [
  { icon: '✍️', label: 'Write content',   sub: 'Emails, posts, stories'   },
  { icon: '🖼️', label: 'Create images',  sub: 'Art, photos, designs'     },
  { icon: '🔧', label: 'Build something', sub: 'Apps, tools, websites'    },
  { icon: '⚡', label: 'Automate work',   sub: 'Save hours every week'    },
  { icon: '📊', label: 'Analyse data',    sub: 'PDFs, sheets, reports'    },
  { icon: '🔎', label: 'Just exploring',  sub: 'Show me what\'s possible' },
];

const PROMPT_CHIPS = [
  'Use cases', 'Monitor the situation', 'Create a prototype',
  'Build a business plan', 'Create content', 'Analyse & research', 'Learn something',
];

let msgCounter = 0;
function mkMsg(role: 'user' | 'assistant', content: string): CloneChatMessage {
  msgCounter++;
  return {
    id:        `msg-${msgCounter}`,
    role,
    content,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

export default function CloneChatPage() {
  const [messages,   setMessages]   = useState<CloneChatMessage[]>([]);
  const [input,      setInput]      = useState('');
  const [activeChip, setActiveChip] = useState('Use cases');
  const [modelId,    setModelId]    = useState('gpt-5');
  const bottomRef = useRef<HTMLDivElement>(null);

  const selectedModel = CLONE_MOCK_MODELS.find((m) => m.id === modelId) ?? CLONE_MOCK_MODELS[0];

  const MOCK_REPLIES: Record<string, string> = {
    'Use cases': 'I can help you with writing, coding, data analysis, research, and more! What would you like to tackle first?',
    default:     `Great question! As ${selectedModel.name}, I can help you with that. Could you tell me more about what you\'re trying to achieve?`,
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg  = mkMsg('user', text);
    const reply    = MOCK_REPLIES[text] ?? MOCK_REPLIES.default;
    const aiMsg    = mkMsg('assistant', reply);
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      sx={{
        display:       'flex',
        flexDirection: 'column',
        height:        `calc(100vh - ${CLONE_TOKENS.navbarHeight}px)`,
        backgroundColor: CLONE_TOKENS.bg,
      }}
    >
      {/* ── Message thread ──────────────────────────────── */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: '2rem', py: '1.5rem' }}>
        {messages.length === 0 ? (
          /* Welcome card */
          <Box
            sx={{
              maxWidth:        560,
              mx:              'auto',
              mt:              '3rem',
              backgroundColor: CLONE_TOKENS.white,
              borderRadius:    '20px',
              border:          `1px solid ${CLONE_TOKENS.border}`,
              p:               '2rem',
              textAlign:       'center',
              boxShadow:       `0 4px 24px rgba(28,26,22,0.08)`,
            }}
          >
            <Box sx={{ fontSize: '2rem', mb: 1.5 }}>➕</Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily:  '"Syne", sans-serif',
                fontWeight:  700,
                color:       CLONE_TOKENS.text,
                mb:          1,
              }}
            >
              Welcome! I&apos;m here to help you 👋
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: CLONE_TOKENS.text2, lineHeight: 1.6, mb: 2.5 }}>
              No tech background needed. Tell me what you&apos;d like to{' '}
              <Box component="span" sx={{ fontWeight: 700, textDecoration: 'underline' }}>achieve</Box>
              {' '}— I&apos;ll help you discover what&apos;s possible, step by step.
            </Typography>

            {/* What would you like to do */}
            <Box
              sx={{
                p:               '1rem',
                borderRadius:    '12px',
                border:          `1px solid ${CLONE_TOKENS.border}`,
                backgroundColor: CLONE_TOKENS.bg,
                mb:              0.5,
              }}
            >
              <Typography
                sx={{
                  fontSize:  '0.7rem',
                  fontWeight: 700,
                  color:     CLONE_TOKENS.accent,
                  mb:        1.25,
                  letterSpacing: '0.06em',
                }}
              >
                ✦ WHAT WOULD YOU LIKE TO DO TODAY?
              </Typography>
              <Grid container spacing={1}>
                {TASK_OPTIONS.map(({ icon, label, sub }) => (
                  <Grid key={label} item xs={6}>
                    <Box
                      onClick={() => sendMessage(label)}
                      sx={{
                        p:               '0.875rem',
                        borderRadius:    '10px',
                        border:          `1px solid ${CLONE_TOKENS.border}`,
                        backgroundColor: CLONE_TOKENS.white,
                        cursor:          'pointer',
                        textAlign:       'left',
                        transition:      'all 0.15s ease',
                        '&:hover': {
                          borderColor:     CLONE_TOKENS.accent,
                          backgroundColor: CLONE_TOKENS.accentLight,
                        },
                      }}
                    >
                      <Box sx={{ fontSize: '1.25rem', mb: 0.5 }}>{icon}</Box>
                      <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: CLONE_TOKENS.text, mb: '2px' }}>
                        {label}
                      </Typography>
                      <Typography sx={{ fontSize: '0.68rem', color: CLONE_TOKENS.text3 }}>
                        {sub}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Typography sx={{ fontSize: '0.75rem', color: CLONE_TOKENS.text3, mt: 1.5 }}>
              Or type anything below — there are no wrong answers ↓
            </Typography>
          </Box>
        ) : (
          /* Message thread */
          <Box sx={{ maxWidth: 720, mx: 'auto' }}>
            {messages.map((msg) => (
              <CloneChatBubble key={msg.id} message={msg} modelName={selectedModel.name} />
            ))}
            <div ref={bottomRef} />
          </Box>
        )}
      </Box>

      {/* ── Input area ──────────────────────────────────── */}
      <Box
        sx={{
          borderTop:       `1px solid ${CLONE_TOKENS.border}`,
          backgroundColor: CLONE_TOKENS.white,
          px:              '2rem',
          pt:              1.5,
          pb:              1.5,
        }}
      >
        {/* Main input */}
        <Box
          sx={{
            maxWidth:        800,
            mx:              'auto',
            display:         'flex',
            alignItems:      'center',
            gap:             1,
            border:          `1px solid ${CLONE_TOKENS.border}`,
            borderRadius:    '14px',
            px:              1.5,
            py:              1,
            backgroundColor: CLONE_TOKENS.bg,
            '&:focus-within': {
              borderColor: CLONE_TOKENS.accent,
              boxShadow:   `0 0 0 3px ${CLONE_TOKENS.accentLight}`,
            },
          }}
        >
          <InputBase
            fullWidth
            multiline
            maxRows={4}
            placeholder="Describe your project, ask a question, or just say hi — I'm here to help..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              fontSize:   '0.875rem',
              color:      CLONE_TOKENS.text,
              fontFamily: '"Instrument Sans", sans-serif',
            }}
          />
          <IconButton
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            sx={{
              width:           36,
              height:          36,
              borderRadius:    '10px',
              backgroundColor: input.trim() ? CLONE_TOKENS.accent : CLONE_TOKENS.bg3,
              color:           '#fff',
              flexShrink:      0,
              transition:      'background 0.15s ease',
              '&:hover': {
                backgroundColor: input.trim() ? CLONE_TOKENS.accentDark : CLONE_TOKENS.bg3,
              },
              '&:disabled': { color: CLONE_TOKENS.text3 },
            }}
          >
            <SendIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        {/* Prompt chips */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            maxWidth:    800,
            mx:          'auto',
            mt:          1,
            overflowX:   'auto',
            pb:          0.5,
            '&::-webkit-scrollbar': { height: 0 },
          }}
        >
          {PROMPT_CHIPS.map((chip) => (
            <Button
              key={chip}
              size="small"
              onClick={() => setActiveChip(chip)}
              sx={{
                whiteSpace:      'nowrap',
                borderRadius:    '2rem',
                fontSize:        '0.72rem',
                fontWeight:      activeChip === chip ? 700 : 500,
                px:              1.5,
                py:              0.5,
                border:          `1px solid ${activeChip === chip ? CLONE_TOKENS.accent : CLONE_TOKENS.border}`,
                backgroundColor: activeChip === chip ? CLONE_TOKENS.accent : 'transparent',
                color:           activeChip === chip ? '#fff' : CLONE_TOKENS.text2,
                '&:hover': {
                  backgroundColor: activeChip === chip ? CLONE_TOKENS.accentDark : CLONE_TOKENS.bg,
                  borderColor:     CLONE_TOKENS.accent,
                },
              }}
            >
              {chip}
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
