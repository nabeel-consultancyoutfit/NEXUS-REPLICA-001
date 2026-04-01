/**
 * CloneBadge — color-coded inline badge replicating the hot/new/open/beta
 * badges visible on model cards at nexusai-db.netlify.app.
 */
import React from 'react';
import { Box } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import type { CloneModelBadge } from '../../types';

interface CloneBadgeProps {
  badge: CloneModelBadge;
}

const BADGE_STYLES: Record<NonNullable<CloneModelBadge>, { bg: string; color: string; label: string }> = {
  hot:  { bg: CLONE_TOKENS.accentLight,  color: CLONE_TOKENS.accent, label: 'Hot'  },
  new:  { bg: CLONE_TOKENS.tealLight,    color: CLONE_TOKENS.teal,   label: 'New'  },
  open: { bg: CLONE_TOKENS.amberLight,   color: CLONE_TOKENS.amber,  label: 'Open' },
  beta: { bg: CLONE_TOKENS.blueLight,    color: CLONE_TOKENS.blue,   label: 'Beta' },
};

export default function CloneBadge({ badge }: CloneBadgeProps) {
  if (!badge) return null;
  const style = BADGE_STYLES[badge];

  return (
    <Box
      component="span"
      sx={{
        display:         'inline-block',
        px:              '6px',
        py:              '2px',
        borderRadius:    '6px',
        backgroundColor: style.bg,
        color:           style.color,
        fontSize:        '0.65rem',
        fontWeight:      700,
        letterSpacing:   '0.03em',
        lineHeight:      1.4,
        flexShrink:      0,
      }}
    >
      {style.label}
    </Box>
  );
}
