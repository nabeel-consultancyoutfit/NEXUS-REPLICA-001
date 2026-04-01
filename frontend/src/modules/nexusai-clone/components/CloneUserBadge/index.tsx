/**
 * CloneUserBadge — right-aligned user selection badge.
 *
 * Shown whenever the user picks a task card or guided discovery option.
 * Matches the reference site: accent-colored pill with icon + label,
 * right-aligned with a small user avatar beside it.
 */
import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface CloneUserBadgeProps {
  icon?:  string;
  label:  string;
}

export default function CloneUserBadge({ icon, label }: CloneUserBadgeProps) {
  return (
    <Box
      sx={{
        display:        'flex',
        justifyContent: 'flex-end',
        alignItems:     'center',
        gap:            '0.5rem',
        mb:             1.25,
        animation:      'cloneFadeIn 0.2s ease',
        '@keyframes cloneFadeIn': {
          from: { opacity: 0, transform: 'translateY(4px)' },
          to:   { opacity: 1, transform: 'translateY(0)'   },
        },
      }}
    >
      {/* Badge pill */}
      <Box
        sx={{
          display:         'inline-flex',
          alignItems:      'center',
          gap:             '0.4rem',
          px:              '0.85rem',
          py:              '0.45rem',
          borderRadius:    '20px',
          backgroundColor: CLONE_TOKENS.accent,
          boxShadow:       '0 2px 8px rgba(200,98,42,0.25)',
        }}
      >
        {icon && (
          <Box sx={{ fontSize: '0.9rem', lineHeight: 1 }}>
            {icon}
          </Box>
        )}
        <Typography
          sx={{
            fontSize:    '0.78rem',
            fontWeight:  700,
            color:       '#fff',
            lineHeight:  1,
          }}
        >
          {label}
        </Typography>
      </Box>

      {/* User avatar */}
      <Avatar
        sx={{
          width:           26,
          height:          26,
          fontSize:        '0.65rem',
          fontWeight:      700,
          backgroundColor: CLONE_TOKENS.accent,
          color:           '#fff',
          flexShrink:      0,
        }}
      >
        U
      </Avatar>
    </Box>
  );
}
