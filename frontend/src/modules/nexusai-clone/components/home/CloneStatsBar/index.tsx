/**
 * CloneStatsBar — four headline stats row that appears below the hero.
 * Matches the "525+ AI Models · 82K Builders · 28 AI Labs · 4.8⭐" bar
 * on nexusai-db.netlify.app.
 */
import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: '525+',  label: 'AI Models'  },
  { value: '82K',   label: 'Builders'   },
  { value: '28',    label: 'AI Labs'    },
  { value: '4.8 ⭐', label: 'Avg Rating' },
];

export default function CloneStatsBar() {
  return (
    <Box
      sx={{
        maxWidth:        700,
        mx:              'auto',
        mb:              '3.5rem',
        px:              '1rem',
      }}
    >
      <Box
        sx={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          flexWrap:        'wrap',
          gap:             0,
          backgroundColor: CLONE_TOKENS.white,
          border:          `1px solid ${CLONE_TOKENS.border}`,
          borderRadius:    '16px',
          boxShadow:       '0 2px 8px rgba(28,26,22,0.06)',
          overflow:        'hidden',
        }}
      >
        {STATS.map((stat, idx) => (
          <Box
            key={stat.label}
            sx={{
              flex:            '1 1 120px',
              textAlign:       'center',
              py:              '1rem',
              px:              '0.5rem',
              borderRight:     idx < STATS.length - 1
                ? `1px solid ${CLONE_TOKENS.border}`
                : 'none',
            }}
          >
            <Typography
              sx={{
                fontFamily:    '"Syne", sans-serif',
                fontWeight:    700,
                fontSize:      '1.5rem',
                color:         CLONE_TOKENS.accent,
                lineHeight:    1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {stat.value}
            </Typography>
            <Typography
              sx={{
                fontSize:   '0.72rem',
                fontWeight: 500,
                color:      CLONE_TOKENS.text3,
                mt:         '2px',
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
