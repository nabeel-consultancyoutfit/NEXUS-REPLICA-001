/**
 * CloneCategoryChip — pill chips replicating the capability/category filter
 * chips on the marketplace page (All, Language, Vision, Code, etc.)
 */
import React from 'react';
import { Box } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface CloneCategoryChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function CloneCategoryChip({ label, active = false, onClick }: CloneCategoryChipProps) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        display:         'inline-flex',
        alignItems:      'center',
        px:              '12px',
        py:              '5px',
        borderRadius:    '2rem',
        border:          `1px solid ${active ? CLONE_TOKENS.accent : CLONE_TOKENS.border}`,
        backgroundColor: active ? CLONE_TOKENS.accent : CLONE_TOKENS.white,
        color:           active ? '#FFFFFF' : CLONE_TOKENS.text2,
        fontSize:        '0.8rem',
        fontWeight:      active ? 600 : 500,
        fontFamily:      '"Instrument Sans", sans-serif',
        cursor:          'pointer',
        transition:      'all 0.15s ease',
        outline:         'none',
        whiteSpace:      'nowrap',
        '&:hover': {
          borderColor:     CLONE_TOKENS.accent,
          color:           active ? '#FFFFFF' : CLONE_TOKENS.accent,
          backgroundColor: active ? CLONE_TOKENS.accentDark : CLONE_TOKENS.accentLight,
        },
      }}
    >
      {label}
    </Box>
  );
}
