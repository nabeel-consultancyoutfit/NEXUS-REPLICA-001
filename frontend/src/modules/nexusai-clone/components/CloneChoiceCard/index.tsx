/**
 * CloneChoiceCard — multi-choice question card shown during guided discovery.
 *
 * Matches the reference site pattern:
 *   • Orange category tag (e.g. "WHO IT'S FOR")
 *   • Question title + subtitle
 *   • Grid of option tiles (icon + label + description)
 *   • Status label below (e.g. "NexusAI Hub · guided setup")
 *   • Disabled mode after a selection is made
 */
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import type { ChatFlowStep, ChatFlowChoice } from '../../types';

interface CloneChoiceCardProps {
  flowStep:        ChatFlowStep;
  onSelect?:       (choice: ChatFlowChoice) => void; // undefined = disabled
  selectedChoice?: string;
}

export default function CloneChoiceCard({
  flowStep,
  onSelect,
  selectedChoice,
}: CloneChoiceCardProps) {
  const disabled = !onSelect;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.5 }}>
      <Box sx={{ maxWidth: 480, width: '100%' }}>
        {/* Card container */}
        <Box
          sx={{
            backgroundColor: CLONE_TOKENS.white,
            border:          `1px solid ${CLONE_TOKENS.border}`,
            borderRadius:    '16px',
            p:               '1.1rem',
            boxShadow:       '0 2px 8px rgba(28,26,22,0.06)',
            opacity:         disabled ? 0.75 : 1,
            transition:      'opacity 0.2s',
          }}
        >
          {/* Category tag */}
          <Box
            sx={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '4px',
              px:             '0.6rem',
              py:             '2px',
              borderRadius:   '20px',
              backgroundColor: '#FDF1EB',
              border:         `1px solid rgba(200,98,42,0.18)`,
              mb:             '0.75rem',
            }}
          >
            <Box
              sx={{
                width:           6,
                height:          6,
                borderRadius:    '50%',
                backgroundColor: CLONE_TOKENS.accent,
                flexShrink:      0,
              }}
            />
            <Typography
              sx={{
                fontSize:    '0.65rem',
                fontWeight:  700,
                color:       CLONE_TOKENS.accent,
                letterSpacing: '0.04em',
              }}
            >
              {flowStep.categoryTag}
            </Typography>
          </Box>

          {/* Question */}
          <Typography
            sx={{
              fontFamily:  '"Syne", sans-serif',
              fontWeight:  700,
              fontSize:    '0.9rem',
              color:       CLONE_TOKENS.text,
              mb:          '3px',
              lineHeight:  1.3,
            }}
          >
            {flowStep.question}
          </Typography>
          <Typography
            sx={{
              fontSize:  '0.72rem',
              color:     CLONE_TOKENS.text3,
              mb:        '0.9rem',
              lineHeight: 1.4,
            }}
          >
            {flowStep.subtitle}
          </Typography>

          {/* Choices grid */}
          <Grid container spacing={0.75}>
            {flowStep.choices.map((choice) => {
              const isSelected = selectedChoice === choice.label;
              return (
                <Grid key={choice.label} item xs={6}>
                  <Box
                    onClick={() => !disabled && onSelect?.(choice)}
                    sx={{
                      display:         'flex',
                      alignItems:      'center',
                      gap:             '0.55rem',
                      p:               '0.65rem 0.75rem',
                      borderRadius:    '10px',
                      border:          `1.5px solid ${isSelected ? CLONE_TOKENS.accent : CLONE_TOKENS.border}`,
                      backgroundColor: isSelected ? '#FDF1EB' : CLONE_TOKENS.bg,
                      cursor:          disabled ? 'default' : 'pointer',
                      transition:      'all 0.15s ease',
                      ...(!disabled && !isSelected && {
                        '&:hover': {
                          borderColor:     CLONE_TOKENS.accent,
                          backgroundColor: '#FDF1EB',
                          transform:       'translateY(-1px)',
                          boxShadow:       '0 4px 12px rgba(200,98,42,0.10)',
                        },
                      }),
                    }}
                  >
                    {/* Icon */}
                    <Box sx={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1 }}>
                      {choice.icon}
                    </Box>
                    {/* Text */}
                    <Box>
                      <Typography
                        sx={{
                          fontSize:    '0.73rem',
                          fontWeight:  isSelected ? 700 : 600,
                          color:       isSelected ? CLONE_TOKENS.accent : CLONE_TOKENS.text,
                          lineHeight:  1.2,
                        }}
                      >
                        {choice.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize:  '0.62rem',
                          color:     CLONE_TOKENS.text3,
                          lineHeight: 1.3,
                          mt:        '1px',
                        }}
                      >
                        {choice.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Status label */}
        <Typography
          sx={{
            fontSize:  '0.62rem',
            color:     CLONE_TOKENS.text3,
            mt:        '5px',
            px:        '4px',
          }}
        >
          {flowStep.statusLabel}
        </Typography>
      </Box>
    </Box>
  );
}
