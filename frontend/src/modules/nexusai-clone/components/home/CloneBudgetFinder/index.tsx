/**
 * CloneBudgetFinder — "Find Models by Budget" four-tier section.
 * Shows Free, Budget, Mid-Range, and Premium model tiers with
 * model examples and model counts.
 * Matches the budget discovery section on nexusai-db.netlify.app.
 */
import React from 'react';
import NextLink from 'next/link';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface BudgetTier {
  icon:        string;
  label:       string;
  sub:         string;
  count:       number;
  countLabel:  string;
  examples:    string;
  accentBg:    string;
  accentBorder: string;
  accentText:  string;
}

const BUDGET_TIERS: BudgetTier[] = [
  {
    icon:         '🆓',
    label:        'Free & Open Source',
    sub:          'Zero API cost',
    count:        6,
    countLabel:   '6 models',
    examples:     'Llama 4 Maverick, Llama 4 Scout, DeepSeek-V3, DeepSeek-R1 — self-host with zero API cost.',
    accentBg:     '#E8F7EF',
    accentBorder: '#B8E6CE',
    accentText:   CLONE_TOKENS.teal,
  },
  {
    icon:         '💸',
    label:        'Budget',
    sub:          'Under $0.50 / 1M tokens',
    count:        9,
    countLabel:   '9 models',
    examples:     'Gemini 3.1 Flash-Lite, Mistral Medium, Nemotron Nano — best performance per dollar.',
    accentBg:     '#EBF0FC',
    accentBorder: '#BDD0F7',
    accentText:   CLONE_TOKENS.blue,
  },
  {
    icon:         '⚖️',
    label:        'Mid-Range',
    sub:          '$1 – $5 / 1M tokens',
    count:        11,
    countLabel:   '11 models',
    examples:     'Claude Sonnet 4.6, Claude Haiku 4.5, Gemini 3.1 Pro, GPT-5.4, Qwen3-Max.',
    accentBg:     '#FDF5E0',
    accentBorder: '#F0DC99',
    accentText:   CLONE_TOKENS.amber,
  },
  {
    icon:         '🏆',
    label:        'Premium',
    sub:          '$5+ / 1M tokens',
    count:        5,
    countLabel:   '5 models',
    examples:     'Claude Opus 4.6, Sora 2 Pro, gpt-image-1.5 — top-tier quality for demanding workloads.',
    accentBg:     CLONE_TOKENS.accentLight,
    accentBorder: `${CLONE_TOKENS.accent}40`,
    accentText:   CLONE_TOKENS.accent,
  },
];

export default function CloneBudgetFinder() {
  return (
    <Box
      component="section"
      sx={{
        maxWidth:        1080,
        mx:              'auto',
        px:              '2rem',
        mb:              '5rem',
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
          Find Models by Budget
        </Typography>
        <Typography
          sx={{
            fontSize:  '0.88rem',
            color:     CLONE_TOKENS.text2,
            maxWidth:  440,
            mx:        'auto',
            lineHeight: 1.6,
          }}
        >
          From free open-source to enterprise-grade — there&apos;s a model for every budget.
        </Typography>
      </Box>

      {/* Tier cards */}
      <Grid container spacing={2}>
        {BUDGET_TIERS.map(({ icon, label, sub, count, countLabel, examples, accentBg, accentBorder, accentText }) => (
          <Grid key={label} item xs={12} sm={6} md={3}>
            <Box
              sx={{
                height:          '100%',
                display:         'flex',
                flexDirection:   'column',
                p:               '1.25rem',
                borderRadius:    '14px',
                border:          `1.5px solid ${accentBorder}`,
                backgroundColor: accentBg,
                transition:      'all 0.18s ease',
                '&:hover': {
                  boxShadow: `0 6px 20px ${accentBorder}`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {/* Icon + count badge */}
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: '0.75rem' }}>
                <Box sx={{ fontSize: '1.6rem', lineHeight: 1 }}>{icon}</Box>
                <Box
                  sx={{
                    px:              '0.55rem',
                    py:              '2px',
                    borderRadius:    '2rem',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    border:          `1px solid ${accentBorder}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize:  '0.65rem',
                      fontWeight: 700,
                      color:     accentText,
                    }}
                  >
                    {countLabel}
                  </Typography>
                </Box>
              </Stack>

              {/* Label + sub */}
              <Typography
                sx={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 700,
                  fontSize:   '0.95rem',
                  color:      CLONE_TOKENS.text,
                  mb:         '2px',
                }}
              >
                {label}
              </Typography>
              <Typography
                sx={{
                  fontSize:  '0.72rem',
                  fontWeight: 600,
                  color:     accentText,
                  mb:        '0.6rem',
                }}
              >
                {sub}
              </Typography>

              {/* Examples */}
              <Typography
                sx={{
                  fontSize:   '0.77rem',
                  color:      CLONE_TOKENS.text2,
                  lineHeight: 1.6,
                  flex:       1,
                  mb:         '0.85rem',
                }}
              >
                {examples}
              </Typography>

              {/* CTA */}
              <Button
                component={NextLink}
                href={`/ai/marketplace?budget=${encodeURIComponent(label)}`}
                size="small"
                sx={{
                  fontSize:        '0.72rem',
                  fontWeight:      700,
                  color:           accentText,
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  border:          `1px solid ${accentBorder}`,
                  borderRadius:    '8px',
                  py:              '0.35rem',
                  px:              '0.75rem',
                  textTransform:   'none',
                  alignSelf:       'flex-start',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                  },
                }}
              >
                Browse {count} models →
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
