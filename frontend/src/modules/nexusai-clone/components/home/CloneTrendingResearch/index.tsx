/**
 * CloneTrendingResearch — "🔥 Trending This Week" research cards section.
 * Six model research summary cards with lab, tag, and description.
 * Matches the trending research section on nexusai-db.netlify.app.
 */
import React from 'react';
import NextLink from 'next/link';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface ResearchItem {
  title:   string;
  lab:     string;
  tag:     string;
  tagIcon: string;
  desc:    string;
}

const RESEARCH_ITEMS: ResearchItem[] = [
  {
    title:   'Claude Opus 4.6 & Sonnet 4.6',
    lab:     'Anthropic',
    tag:     'Just Released',
    tagIcon: '🆕',
    desc:    'Adaptive Thinking and 1M token context (beta) mark a major leap in agent capability. Now the most intelligent Claude for coding and agentic tasks.',
  },
  {
    title:   'Gemini 3.1 Pro — Thought Signatures',
    lab:     'Google DeepMind',
    tag:     'Hot',
    tagIcon: '🔥',
    desc:    'Thought Signatures bring new transparency to deep reasoning. 5M context window makes it the go-to for ultra-long document analysis.',
  },
  {
    title:   'GPT-5.4 — Native Computer-Use Agents',
    lab:     'OpenAI',
    tag:     'Computer Use',
    tagIcon: '🤖',
    desc:    'GPT-5.4 introduces native computer-use agents, letting it operate browsers, apps, and files autonomously with improved reasoning efficiency.',
  },
  {
    title:   'Grok-4-1 Fast — 4-Agent Architecture',
    lab:     'xAI',
    tag:     'Real-Time',
    tagIcon: '⚡',
    desc:    'Grok\'s 4-agent architecture with real-time X (Twitter) data access and 2M context makes it unique for real-time analysis tasks.',
  },
  {
    title:   'Llama 4 Maverick — 400B MoE',
    lab:     'Meta',
    tag:     'Open Source',
    tagIcon: '🔓',
    desc:    'Meta\'s 400B Mixture-of-Experts model with native multimodal understanding. Free to self-host with a full commercial licence.',
  },
  {
    title:   'Devstral 2 — Fastest Coding Agent',
    lab:     'Mistral',
    tag:     'Coding',
    tagIcon: '💻',
    desc:    'Mistral\'s coding agent with 256K context, multi-file edits, and codebase navigation. The fastest software engineering model available.',
  },
];

// Map lab names to small accent colors for variety
const LAB_COLORS: Record<string, string> = {
  Anthropic:       CLONE_TOKENS.accent,
  'Google DeepMind': CLONE_TOKENS.blue,
  OpenAI:          CLONE_TOKENS.teal,
  xAI:             CLONE_TOKENS.text2,
  Meta:            CLONE_TOKENS.blue,
  Mistral:         CLONE_TOKENS.amber,
};

export default function CloneTrendingResearch() {
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
          🔥 Trending This Week
        </Typography>
        <Button
          component={NextLink}
          href="/ai/discover"
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
          View research feed →
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {RESEARCH_ITEMS.map(({ title, lab, tag, tagIcon, desc }) => {
          const labColor = LAB_COLORS[lab] ?? CLONE_TOKENS.text2;
          return (
            <Grid key={title} item xs={12} sm={6} md={4}>
              <Box
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
                    boxShadow:   `0 6px 20px rgba(200,98,42,0.08)`,
                    transform:   'translateY(-2px)',
                  },
                }}
              >
                {/* Tag pill + lab */}
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: '0.6rem' }}>
                  <Box
                    sx={{
                      display:         'inline-flex',
                      alignItems:      'center',
                      gap:             '3px',
                      px:              '0.45rem',
                      py:              '2px',
                      borderRadius:    '2rem',
                      backgroundColor: `${CLONE_TOKENS.accent}15`,
                      border:          `1px solid ${CLONE_TOKENS.accent}30`,
                    }}
                  >
                    <Typography sx={{ fontSize: '0.65rem' }}>{tagIcon}</Typography>
                    <Typography
                      sx={{
                        fontSize:  '0.62rem',
                        fontWeight: 700,
                        color:     CLONE_TOKENS.accent,
                      }}
                    >
                      {tag}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize:  '0.68rem',
                      fontWeight: 600,
                      color:     labColor,
                    }}
                  >
                    {lab}
                  </Typography>
                </Stack>

                {/* Title */}
                <Typography
                  sx={{
                    fontFamily: '"Syne", sans-serif',
                    fontWeight: 700,
                    fontSize:   '0.875rem',
                    color:      CLONE_TOKENS.text,
                    lineHeight: 1.4,
                    mb:         '0.5rem',
                    flex:       0,
                  }}
                >
                  {title}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    fontSize:   '0.78rem',
                    color:      CLONE_TOKENS.text2,
                    lineHeight: 1.6,
                    flex:       1,
                  }}
                >
                  {desc}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
