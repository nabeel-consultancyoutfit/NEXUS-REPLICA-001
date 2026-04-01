/**
 * CloneModelComparison — "Flagship Model Comparison" table.
 * Scrollable table comparing top models by context, price, multimodal, speed, use case.
 * Matches the comparison table on nexusai-db.netlify.app.
 */
import React from 'react';
import NextLink from 'next/link';
import { Box, Typography, Stack, Button } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface ModelRow {
  name:        string;
  lab:         string;
  context:     string;
  inputPrice:  string;
  outputPrice: string;
  multimodal:  boolean;
  speed:       'Fast' | 'Medium' | 'Slow';
  bestFor:     string;
}

const MODEL_ROWS: ModelRow[] = [
  {
    name:        'GPT-5.4',
    lab:         'OpenAI',
    context:     '1.05M',
    inputPrice:  '$2.50',
    outputPrice: '$10.00',
    multimodal:  true,
    speed:       'Fast',
    bestFor:     'Agents & coding',
  },
  {
    name:        'Claude Opus 4.6',
    lab:         'Anthropic',
    context:     '1M (beta)',
    inputPrice:  '$15.00',
    outputPrice: '$75.00',
    multimodal:  true,
    speed:       'Medium',
    bestFor:     'Complex reasoning',
  },
  {
    name:        'Gemini 3.1 Pro',
    lab:         'Google',
    context:     '5M',
    inputPrice:  '$3.50',
    outputPrice: '$10.50',
    multimodal:  true,
    speed:       'Fast',
    bestFor:     'Long documents',
  },
  {
    name:        'Grok-4-1 Fast',
    lab:         'xAI',
    context:     '2M',
    inputPrice:  '$3.00',
    outputPrice: '$15.00',
    multimodal:  false,
    speed:       'Fast',
    bestFor:     'Real-time analysis',
  },
  {
    name:        'Llama 4 Maverick',
    lab:         'Meta',
    context:     '128K',
    inputPrice:  'Free',
    outputPrice: 'Free',
    multimodal:  true,
    speed:       'Medium',
    bestFor:     'Self-hosted / OSS',
  },
  {
    name:        'DeepSeek-R1',
    lab:         'DeepSeek',
    context:     '128K',
    inputPrice:  '$0.55',
    outputPrice: '$2.19',
    multimodal:  false,
    speed:       'Slow',
    bestFor:     'Math & research',
  },
];

const SPEED_COLORS: Record<string, string> = {
  Fast:   CLONE_TOKENS.green,
  Medium: CLONE_TOKENS.amber,
  Slow:   CLONE_TOKENS.text3,
};

const TH_SX = {
  fontSize:       '0.68rem',
  fontWeight:     700,
  color:          CLONE_TOKENS.text3,
  letterSpacing:  '0.05em',
  textTransform:  'uppercase' as const,
  py:             '0.75rem',
  px:             '0.85rem',
  whiteSpace:     'nowrap' as const,
  borderBottom:   `2px solid ${CLONE_TOKENS.border}`,
  backgroundColor: CLONE_TOKENS.bg,
};

const TD_SX = {
  fontSize:    '0.82rem',
  color:       CLONE_TOKENS.text2,
  py:          '0.9rem',
  px:          '0.85rem',
  borderBottom: `1px solid ${CLONE_TOKENS.border}`,
  whiteSpace:  'nowrap' as const,
};

export default function CloneModelComparison() {
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
        sx={{ mb: '1.5rem' }}
      >
        <Box>
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
            Flagship Model Comparison
          </Typography>
          <Typography
            sx={{ fontSize: '0.78rem', color: CLONE_TOKENS.text3, mt: '3px' }}
          >
            Prices shown are approximate. Free self-hosted models exclude infrastructure costs.
          </Typography>
        </Box>
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
            flexShrink:    0,
            '&:hover':     { backgroundColor: 'transparent', textDecoration: 'underline' },
          }}
        >
          Compare all →
        </Button>
      </Stack>

      {/* Scrollable table wrapper */}
      <Box
        sx={{
          overflowX:    'auto',
          borderRadius: '14px',
          border:       `1px solid ${CLONE_TOKENS.border}`,
          boxShadow:    '0 2px 8px rgba(28,26,22,0.05)',
          '&::-webkit-scrollbar':       { height: 4 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { background: CLONE_TOKENS.bg3, borderRadius: 4 },
        }}
      >
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
          <Box component="thead">
            <Box component="tr">
              {['Model', 'Lab', 'Context', 'Input $/1M', 'Output $/1M', 'Multimodal', 'Speed', 'Best For'].map(
                (col) => (
                  <Box key={col} component="th" sx={{ ...TH_SX, textAlign: 'left' }}>
                    {col}
                  </Box>
                ),
              )}
            </Box>
          </Box>

          <Box component="tbody">
            {MODEL_ROWS.map((row, idx) => (
              <Box
                key={row.name}
                component="tr"
                sx={{
                  backgroundColor: idx % 2 === 0 ? CLONE_TOKENS.white : 'rgba(244,242,238,0.4)',
                  transition:      'background 0.12s ease',
                  '&:hover':       { backgroundColor: CLONE_TOKENS.accentLight },
                  '&:last-child td, &:last-child th': { borderBottom: 'none' },
                }}
              >
                {/* Model name */}
                <Box component="td" sx={{ ...TD_SX, fontWeight: 700, color: CLONE_TOKENS.text }}>
                  {row.name}
                </Box>
                {/* Lab */}
                <Box component="td" sx={TD_SX}>{row.lab}</Box>
                {/* Context */}
                <Box component="td" sx={{ ...TD_SX, fontFamily: 'monospace' }}>{row.context}</Box>
                {/* Input price */}
                <Box component="td" sx={{ ...TD_SX, fontFamily: 'monospace' }}>{row.inputPrice}</Box>
                {/* Output price */}
                <Box component="td" sx={{ ...TD_SX, fontFamily: 'monospace' }}>{row.outputPrice}</Box>
                {/* Multimodal */}
                <Box component="td" sx={{ ...TD_SX, textAlign: 'center' as const }}>
                  <Typography sx={{ fontSize: '1rem' }}>
                    {row.multimodal ? '✅' : '—'}
                  </Typography>
                </Box>
                {/* Speed */}
                <Box component="td" sx={TD_SX}>
                  <Box
                    sx={{
                      display:         'inline-flex',
                      alignItems:      'center',
                      gap:             '4px',
                      px:              '0.5rem',
                      py:              '2px',
                      borderRadius:    '2rem',
                      backgroundColor: `${SPEED_COLORS[row.speed]}18`,
                    }}
                  >
                    <Box
                      sx={{
                        width:           6,
                        height:          6,
                        borderRadius:    '50%',
                        backgroundColor: SPEED_COLORS[row.speed],
                        flexShrink:      0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize:  '0.72rem',
                        fontWeight: 600,
                        color:     SPEED_COLORS[row.speed],
                      }}
                    >
                      {row.speed}
                    </Typography>
                  </Box>
                </Box>
                {/* Best for */}
                <Box component="td" sx={TD_SX}>{row.bestFor}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
