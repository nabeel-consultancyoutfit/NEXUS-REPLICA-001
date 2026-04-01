/**
 * CloneUseCaseGrid — "Quick-Start by Use Case" section.
 * Eight use-case cards each showing an icon, title, featured model names,
 * and a CTA that routes to the chat hub with a preset prompt.
 * Matches the use-case quick-start grid on nexusai-db.netlify.app.
 */
import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Stack, Grid } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface UseCase {
  icon:    string;
  title:   string;
  models:  string[];
  cta:     string;
  prompt:  string;
}

const USE_CASES: UseCase[] = [
  {
    icon:   '💻',
    title:  'Code Generation',
    models: ['Claude Opus 4.6', 'Devstral 2', 'GPT-5.4', 'Qwen3-Coder'],
    cta:    'Start building →',
    prompt: 'Help me write code — suggest the best AI model for code generation',
  },
  {
    icon:   '🎨',
    title:  'Image Generation',
    models: ['gpt-image-1.5', 'Grok-Imagine-Pro', 'Gemini Flash Image'],
    cta:    'Create images →',
    prompt: 'I want to create AI-generated images — help me choose a model',
  },
  {
    icon:   '🤖',
    title:  'AI Agents',
    models: ['GPT-5.4', 'Claude Opus 4.6', 'kimi-k2.5', 'Grok-4-1'],
    cta:    'Build agents →',
    prompt: 'Help me build an autonomous AI agent',
  },
  {
    icon:   '📄',
    title:  'Document Analysis',
    models: ['Claude Sonnet 4.6', 'Gemini 3.1 Pro', 'Nemotron Ultra'],
    cta:    'Analyse docs →',
    prompt: 'I need to analyse and extract information from documents',
  },
  {
    icon:   '🎬',
    title:  'Video Generation',
    models: ['Sora 2 Pro', 'Veo 3.1', 'Grok-Imagine-Video'],
    cta:    'Create video →',
    prompt: 'Help me generate AI videos — which model should I use?',
  },
  {
    icon:   '🔊',
    title:  'Voice & Audio',
    models: ['Gemini-TTS', 'ElevenLabs', 'Whisper v3'],
    cta:    'Add voice →',
    prompt: 'I want to add AI voice or audio generation to my project',
  },
  {
    icon:   '🌍',
    title:  'Multilingual / Translation',
    models: ['Qwen3-Max (119 langs)', 'Gemini 3.1 Flash-Lite', 'GLM-4.7'],
    cta:    'Go multilingual →',
    prompt: 'I need an AI model for translation and multilingual tasks',
  },
  {
    icon:   '🔢',
    title:  'Math & Research',
    models: ['DeepSeek-R1', 'QwQ-32B', 'Gemini 3.1 Pro'],
    cta:    'Start researching →',
    prompt: 'I need an AI model for advanced math problems and research',
  },
];

export default function CloneUseCaseGrid() {
  const router = useRouter();

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
      {/* Section heading */}
      <Box sx={{ textAlign: 'center', mb: '2rem' }}>
        <Typography
          component="h2"
          sx={{
            fontFamily:    '"Syne", sans-serif',
            fontWeight:    700,
            fontSize:      'clamp(1.3rem, 3vw, 1.75rem)',
            letterSpacing: '-0.02em',
            color:         CLONE_TOKENS.text,
            mb:            '0.4rem',
          }}
        >
          Quick-Start by Use Case
        </Typography>
        <Typography
          sx={{
            fontSize:  '0.88rem',
            color:     CLONE_TOKENS.text2,
            maxWidth:  420,
            mx:        'auto',
            lineHeight: 1.6,
          }}
        >
          Jump straight into the right model for your task — no research required.
        </Typography>
      </Box>

      {/* Use case cards */}
      <Grid container spacing={2}>
        {USE_CASES.map(({ icon, title, models, cta, prompt }) => (
          <Grid key={title} item xs={12} sm={6} md={3}>
            <Box
              onClick={() =>
                router.push({ pathname: '/ai/chat', query: { prompt } })
              }
              sx={{
                height:          '100%',
                display:         'flex',
                flexDirection:   'column',
                p:               '1.25rem',
                borderRadius:    '14px',
                border:          `1px solid ${CLONE_TOKENS.border}`,
                backgroundColor: CLONE_TOKENS.white,
                cursor:          'pointer',
                transition:      'all 0.18s ease',
                '&:hover': {
                  borderColor: CLONE_TOKENS.accent,
                  boxShadow:   `0 6px 20px rgba(200,98,42,0.10)`,
                  transform:   'translateY(-2px)',
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width:           44,
                  height:          44,
                  borderRadius:    '12px',
                  backgroundColor: CLONE_TOKENS.bg,
                  border:          `1px solid ${CLONE_TOKENS.border}`,
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  fontSize:        '1.3rem',
                  mb:              '0.75rem',
                  flexShrink:      0,
                }}
              >
                {icon}
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 700,
                  fontSize:   '0.875rem',
                  color:      CLONE_TOKENS.text,
                  mb:         '0.5rem',
                }}
              >
                {title}
              </Typography>

              {/* Model tags */}
              <Stack
                direction="row"
                flexWrap="wrap"
                gap="4px"
                sx={{ mb: '0.75rem', flex: 1 }}
              >
                {models.slice(0, 3).map((m) => (
                  <Box
                    key={m}
                    sx={{
                      px:              '0.45rem',
                      py:              '1px',
                      borderRadius:    '4px',
                      backgroundColor: CLONE_TOKENS.bg,
                      border:          `1px solid ${CLONE_TOKENS.border}`,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize:  '0.62rem',
                        fontWeight: 500,
                        color:     CLONE_TOKENS.text3,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {m}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              {/* CTA */}
              <Typography
                sx={{
                  fontSize:  '0.78rem',
                  fontWeight: 700,
                  color:     CLONE_TOKENS.accent,
                  mt:        'auto',
                  transition: 'opacity 0.12s ease',
                  '&:hover': { opacity: 0.75 },
                }}
              >
                {cta}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
