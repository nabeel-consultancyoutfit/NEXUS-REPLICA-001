/**
 * CloneValueProps — "Built for every builder" feature grid.
 * Six value-proposition cards with icon, title, and description.
 * Matches the value grid section on nexusai-db.netlify.app.
 */
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface ValueItem {
  icon:  string;
  title: string;
  desc:  string;
}

const VALUE_ITEMS: ValueItem[] = [
  {
    icon:  '🧭',
    title: 'Guided Discovery Chat',
    desc:  'Not sure where to start? Our AI guide asks the right questions and builds a personalised prompt — no tech knowledge needed.',
  },
  {
    icon:  '📐',
    title: 'Prompt Engineering Guide',
    desc:  'Step-by-step prompting templates for every use case. Write prompts that get better outputs, every time.',
  },
  {
    icon:  '🤖',
    title: 'Agent Builder',
    desc:  'Create autonomous AI agents from templates or scratch. Connect tools, set memory, and deploy in minutes.',
  },
  {
    icon:  '💰',
    title: 'Flexible Pricing',
    desc:  'Pay-per-use, subscription, or free tier — choose what fits. Full cost transparency before you run a single token.',
  },
  {
    icon:  '⭐',
    title: 'User Reviews & Ratings',
    desc:  'Real feedback from 82K+ builders. See how each model performs in production before you commit.',
  },
  {
    icon:  '🔬',
    title: 'Research Feed',
    desc:  'Weekly digest of new model releases, benchmark results, and pricing changes — curated so you stay ahead.',
  },
];

export default function CloneValueProps() {
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
      <Box sx={{ textAlign: 'center', mb: '2.5rem' }}>
        <Typography
          component="h2"
          sx={{
            fontFamily:    '"Syne", sans-serif',
            fontWeight:    700,
            fontSize:      'clamp(1.6rem, 3.5vw, 2.25rem)',
            letterSpacing: '-0.02em',
            color:         CLONE_TOKENS.text,
            mb:            '0.5rem',
          }}
        >
          Built for every builder
        </Typography>
        <Typography
          sx={{
            fontSize:  '0.95rem',
            color:     CLONE_TOKENS.text2,
            maxWidth:  460,
            mx:        'auto',
            lineHeight: 1.6,
          }}
        >
          Everything you need to find, compare, and deploy the right AI model — without the overwhelm.
        </Typography>
      </Box>

      {/* Feature cards */}
      <Grid container spacing={2}>
        {VALUE_ITEMS.map(({ icon, title, desc }) => (
          <Grid key={title} item xs={12} sm={6} md={4}>
            <Box
              sx={{
                height:          '100%',
                p:               '1.5rem',
                borderRadius:    '16px',
                border:          `1px solid ${CLONE_TOKENS.border}`,
                backgroundColor: CLONE_TOKENS.white,
                transition:      'all 0.2s ease',
                '&:hover': {
                  borderColor: CLONE_TOKENS.accent,
                  boxShadow:   `0 6px 24px rgba(200,98,42,0.09)`,
                  transform:   'translateY(-2px)',
                },
              }}
            >
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
                  mb:              '0.85rem',
                }}
              >
                {icon}
              </Box>
              <Typography
                sx={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 700,
                  fontSize:   '0.95rem',
                  color:      CLONE_TOKENS.text,
                  mb:         '0.4rem',
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  fontSize:   '0.8rem',
                  color:      CLONE_TOKENS.text2,
                  lineHeight: 1.6,
                }}
              >
                {desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
