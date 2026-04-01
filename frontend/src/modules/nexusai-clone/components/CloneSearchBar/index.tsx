/**
 * CloneSearchBar — search input matching the marketplace search bar style
 * on nexusai-db.netlify.app (rounded, accent focus ring).
 */
import React from 'react';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface CloneSearchBarProps {
  placeholder?: string;
  value:        string;
  onChange:     (value: string) => void;
}

export default function CloneSearchBar({ placeholder = 'Search models, capabilities...', value, onChange }: CloneSearchBarProps) {
  return (
    <Box
      sx={{
        display:         'flex',
        alignItems:      'center',
        gap:             1,
        px:              1.5,
        py:              0.875,
        borderRadius:    '12px',
        border:          `1px solid ${CLONE_TOKENS.border}`,
        backgroundColor: CLONE_TOKENS.white,
        transition:      'border-color 0.15s ease, box-shadow 0.15s ease',
        '&:focus-within': {
          borderColor: CLONE_TOKENS.accent,
          boxShadow:   `0 0 0 3px ${CLONE_TOKENS.accentLight}`,
        },
      }}
    >
      <SearchIcon sx={{ color: CLONE_TOKENS.text3, fontSize: 18, flexShrink: 0 }} />
      <InputBase
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          fontSize:   '0.875rem',
          color:      CLONE_TOKENS.text,
          fontFamily: '"Instrument Sans", sans-serif',
          '& input::placeholder': {
            color:   CLONE_TOKENS.text3,
            opacity: 1,
          },
        }}
      />
    </Box>
  );
}
