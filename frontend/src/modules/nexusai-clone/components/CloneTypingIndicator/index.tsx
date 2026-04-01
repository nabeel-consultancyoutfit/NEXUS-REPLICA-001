/**
 * CloneTypingIndicator — animated "..." dots shown while the AI is "thinking".
 *
 * Matches the reference site: three pulsing dots, left-aligned,
 * with the NexusAI orange icon and an optional status label below.
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface CloneTypingIndicatorProps {
  statusLabel?: string; // e.g. 'NexusAI Hub · building prompt'
}

export default function CloneTypingIndicator({
  statusLabel = 'NexusAI Hub · thinking',
}: CloneTypingIndicatorProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.5 }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
          {/* NexusAI icon */}
          <Box
            sx={{
              width:           28,
              height:          28,
              borderRadius:    '50%',
              backgroundColor: CLONE_TOKENS.accent,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              flexShrink:      0,
              fontSize:        '0.7rem',
              color:           '#fff',
              fontWeight:      800,
              fontFamily:      '"Syne", sans-serif',
            }}
          >
            N
          </Box>

          {/* Dots bubble */}
          <Box
            sx={{
              px:              '1rem',
              py:              '0.7rem',
              borderRadius:    '16px 16px 16px 4px',
              backgroundColor: CLONE_TOKENS.white,
              border:          `1px solid ${CLONE_TOKENS.border}`,
              boxShadow:       '0 1px 4px rgba(28,26,22,0.06)',
              display:         'flex',
              alignItems:      'center',
              gap:             '5px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  width:           7,
                  height:          7,
                  borderRadius:    '50%',
                  backgroundColor: CLONE_TOKENS.text3,
                  animation:       `clonePulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                  '@keyframes clonePulse': {
                    '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: 0.4 },
                    '40%':           { transform: 'scale(1.0)', opacity: 1   },
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Status label */}
        <Typography
          sx={{
            fontSize:  '0.62rem',
            color:     CLONE_TOKENS.text3,
            mt:        '5px',
            px:        '4px',
            ml:        '36px',
          }}
        >
          {statusLabel}
        </Typography>
      </Box>
    </Box>
  );
}
