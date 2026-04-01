/**
 * CloneAiLabs — "Browse by AI Lab" section.
 * 11 lab cards with emoji icon, name, and model count.
 * Matches the AI labs browse section on nexusai-db.netlify.app.
 */
import React from 'react';
import NextLink from 'next/link';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface Lab {
  icon:        string;
  name:        string;
  modelCount:  number;
  accentColor?: string;
}

const AI_LABS: Lab[] = [
  { icon: '🧠', name: 'OpenAI',           modelCount: 3  },
  { icon: '⚡', name: 'Anthropic',         modelCount: 3  },
  { icon: '🔬', name: 'Google DeepMind',  modelCount: 5  },
  { icon: '𝕏',  name: 'xAI / Grok',       modelCount: 2  },
  { icon: '💻', name: 'DeepSeek',          modelCount: 3  },
  { icon: '🦙', name: 'Meta / Llama',      modelCount: 2  },
  { icon: '🀄', name: 'Alibaba / Qwen',   modelCount: 2  },
  { icon: '🌀', name: 'Mistral',           modelCount: 2  },
  { icon: '🟢', name: 'NVIDIA NIM',        modelCount: 4  },
  { icon: '🔷', name: 'GLM / Zhipu',       modelCount: 3  },
  { icon: '🌙', name: 'Moonshot / Kimi',  modelCount: 2  },
];

export default function CloneAiLabs() {
  return (
    <Box
      component="section"
      sx={{
        maxWidth: 1080,
        mx:       'auto',
        px:       '2rem',
        mb:       '5rem',
      }}
    >
      {/* Section header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: '1.75rem' }}
      >
        <Typography
          component="h2"
          sx={{
            fontFamily:    '"Syne", sans-serif',
            fontWeight:    700,
            fontSize:      'clamp(1.3rem, 3vw, 1.75rem)',
            letterSpacing: '-0.02em',
            color:         CLONE_TOKENS.text,
          }}
        >
          Browse by AI Lab
        </Typography>
        <Button
          component={NextLink}
          href="/ai/marketplace"
          variant="text"
          sx={{
            color:         CLONE_TOKENS.accent,
            fontSize:      '0.82rem',
            fontWeight:    600,
            px:            0,
            textTransform: 'none',
            '&:hover':     { backgroundColor: 'transparent', textDecoration: 'underline' },
          }}
        >
          See all labs →
        </Button>
      </Stack>

      {/* Lab cards */}
      <Grid container spacing={1.5}>
        {AI_LABS.map(({ icon, name, modelCount }) => (
          <Grid key={name} item xs={6} sm={4} md={3} lg={2}>
            <Box
              component={NextLink}
              href={`/ai/marketplace?lab=${encodeURIComponent(name)}`}
              sx={{
                textDecoration:  'none',
                display:         'flex',
                flexDirection:   'column',
                alignItems:      'center',
                gap:             '0.5rem',
                py:              '1.25rem',
                px:              '0.75rem',
                borderRadius:    '12px',
                border:          `1px solid ${CLONE_TOKENS.border}`,
                backgroundColor: CLONE_TOKENS.white,
                cursor:          'pointer',
                transition:      'all 0.15s ease',
                '&:hover': {
                  borderColor:     CLONE_TOKENS.accent,
                  backgroundColor: CLONE_TOKENS.accentLight,
                  transform:       'translateY(-2px)',
                  boxShadow:       `0 4px 12px rgba(200,98,42,0.10)`,
                },
              }}
            >
              <Box sx={{ fontSize: '1.6rem', lineHeight: 1 }}>{icon}</Box>
              <Typography
                sx={{
                  fontSize:  '0.78rem',
                  fontWeight: 600,
                  color:     CLONE_TOKENS.text,
                  textAlign: 'center',
                  lineHeight: 1.25,
                }}
              >
                {name}
              </Typography>
              <Box
                sx={{
                  px:              '0.5rem',
                  py:              '1px',
                  borderRadius:    '2rem',
                  backgroundColor: CLONE_TOKENS.bg,
                  border:          `1px solid ${CLONE_TOKENS.border}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize:  '0.62rem',
                    fontWeight: 600,
                    color:     CLONE_TOKENS.text3,
                  }}
                >
                  {modelCount} model{modelCount !== 1 ? 's' : ''}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
