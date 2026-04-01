/**
 * CloneSidebar — 252px left panel replicating the Chat Hub model list sidebar
 * from nexusai-db.netlify.app.
 *
 * Shows: "MODELS" heading, search input, scrollable model list with
 * colorful icon, model name, provider, and live status dot.
 */
import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Stack,
  InputAdornment,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import { CLONE_MOCK_MODELS } from '@/modules/nexusai-clone/mock';

interface CloneSidebarProps {
  selectedModelId?: string;
  onSelectModel?: (id: string) => void;
}

export default function CloneSidebar({ selectedModelId, onSelectModel }: CloneSidebarProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      CLONE_MOCK_MODELS.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.provider.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <Box
      sx={{
        width:           { lg: `${CLONE_TOKENS.sidebarWidth}px`, xl: `${CLONE_TOKENS.sidebarWidth}px` },
        flexShrink:      0,
        height:          `calc(100vh - ${CLONE_TOKENS.navbarHeight}px)`,
        position:        'sticky',
        top:             `${CLONE_TOKENS.navbarHeight}px`,
        overflowY:       'auto',
        overflowX:       'hidden',
        backgroundColor: CLONE_TOKENS.white,
        borderRight:     `1px solid ${CLONE_TOKENS.border}`,
        display:         'flex',
        flexDirection:   'column',

        /* Custom scrollbar */
        '&::-webkit-scrollbar':       { width: 4 },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { background: CLONE_TOKENS.bg3, borderRadius: 4 },
      }}
    >
      {/* Header */}
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography
          sx={{
            fontSize:      '0.7rem',
            fontWeight:    700,
            letterSpacing: '0.08em',
            color:         CLONE_TOKENS.text3,
            mb:            1.5,
          }}
        >
          MODELS
        </Typography>

        <TextField
          fullWidth
          size="small"
          placeholder="Search 525 models..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 16, color: CLONE_TOKENS.text3 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              fontSize:     '0.8rem',
              backgroundColor: CLONE_TOKENS.bg,
              '& fieldset':   { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: CLONE_TOKENS.border },
              '&.Mui-focused fieldset': {
                borderColor: CLONE_TOKENS.accent,
                borderWidth: 1.5,
              },
            },
          }}
        />
      </Box>

      <Divider sx={{ borderColor: CLONE_TOKENS.border, mt: 1 }} />

      {/* Model List */}
      <Box sx={{ flex: 1, py: 1 }}>
        {filtered.map((model) => {
          const isSelected = model.id === selectedModelId;
          return (
            <Box
              key={model.id}
              onClick={() => onSelectModel?.(model.id)}
              sx={{
                display:         'flex',
                alignItems:      'center',
                gap:             1.25,
                px:              2,
                py:              0.875,
                cursor:          'pointer',
                backgroundColor: isSelected ? CLONE_TOKENS.accentLight : 'transparent',
                borderLeft:      isSelected
                  ? `2px solid ${CLONE_TOKENS.accent}`
                  : '2px solid transparent',
                transition:      'background 0.12s ease',
                '&:hover': {
                  backgroundColor: isSelected ? CLONE_TOKENS.accentLight : CLONE_TOKENS.bg,
                },
              }}
            >
              {/* Colorful icon */}
              <Box
                sx={{
                  width:        32,
                  height:       32,
                  borderRadius: '8px',
                  backgroundColor: model.iconBg,
                  display:      'flex',
                  alignItems:   'center',
                  justifyContent: 'center',
                  fontSize:     '1rem',
                  flexShrink:   0,
                }}
              >
                {model.icon}
              </Box>

              {/* Name + provider */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize:    '0.8rem',
                    fontWeight:  isSelected ? 600 : 500,
                    color:       isSelected ? CLONE_TOKENS.accent : CLONE_TOKENS.text,
                    whiteSpace:  'nowrap',
                    overflow:    'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {model.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  {/* Live status dot */}
                  <Box
                    sx={{
                      width:           6,
                      height:          6,
                      borderRadius:    '50%',
                      backgroundColor: model.status === 'live' ? CLONE_TOKENS.green : CLONE_TOKENS.text3,
                      flexShrink:      0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize:  '0.7rem',
                      color:     CLONE_TOKENS.text3,
                      whiteSpace: 'nowrap',
                      overflow:  'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {model.provider}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
