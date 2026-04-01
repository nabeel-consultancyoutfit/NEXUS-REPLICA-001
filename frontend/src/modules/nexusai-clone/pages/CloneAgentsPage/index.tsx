/**
 * CloneAgentsPage — replicates the Agents page at nexusai-db.netlify.app.
 *
 * Shows: agent template cards grid + "Build your own" CTA.
 * Uses CloneAppLayout (sidebar + right panel).
 */
import React, { useState } from 'react';
import { Box, Typography, Grid, Stack, Button } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AddIcon from '@mui/icons-material/Add';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import CloneSearchBar from '../../components/CloneSearchBar';
import CloneCategoryChip from '../../components/CloneCategoryChip';
import { CLONE_MOCK_AGENTS } from '../../mock';

const AGENT_CATEGORIES = ['All', 'Research', 'Coding', 'Writing', 'Analysis', 'Creative'];

export default function CloneAgentsPage() {
  const [search, setSearch]   = useState('');
  const [category, setCategory] = useState('All');

  const filtered = CLONE_MOCK_AGENTS.filter((a) => {
    const matchSearch   = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'All' || a.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <Box
      sx={{
        flex:            1,
        height:          `calc(100vh - ${CLONE_TOKENS.navbarHeight}px)`,
        overflowY:       'auto',
        backgroundColor: CLONE_TOKENS.bg,
        p:               '1.75rem',
      }}
    >
      {/* ── Header ─────────────────────────────────────── */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <SmartToyIcon sx={{ color: CLONE_TOKENS.accent, fontSize: 22 }} />
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily:  '"Syne", sans-serif',
                fontWeight:  700,
                color:       CLONE_TOKENS.text,
                letterSpacing: '-0.02em',
              }}
            >
              Agents
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: CLONE_TOKENS.text2 }}>
              Pre-built AI agents ready to deploy instantly
            </Typography>
          </Box>
        </Stack>

        {/* Build your own CTA */}
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{
            background:   `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
            color:        '#fff',
            fontWeight:   700,
            px:           2,
            py:           0.875,
            borderRadius: '2rem',
            fontSize:     '0.8rem',
            '&:hover': {
              background: `linear-gradient(135deg, ${CLONE_TOKENS.accentDark} 0%, #8A3D10 100%)`,
            },
          }}
        >
          Build an Agent
        </Button>
      </Stack>

      {/* ── Search ─────────────────────────────────────── */}
      <Box sx={{ mb: 2, maxWidth: 480 }}>
        <CloneSearchBar
          placeholder="Search agents..."
          value={search}
          onChange={setSearch}
        />
      </Box>

      {/* ── Category chips ─────────────────────────────── */}
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        {AGENT_CATEGORIES.map((cat) => (
          <CloneCategoryChip key={cat} label={cat} active={category === cat} onClick={() => setCategory(cat)} />
        ))}
      </Stack>

      {/* ── Agent cards grid ────────────────────────────── */}
      <Grid container spacing={2}>
        {filtered.map((agent) => (
          <Grid key={agent.id} item xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                backgroundColor: CLONE_TOKENS.white,
                border:          `1px solid ${CLONE_TOKENS.border}`,
                borderRadius:    '12px',
                p:               '1.25rem',
                height:          '100%',
                display:         'flex',
                flexDirection:   'column',
                cursor:          'pointer',
                transition:      'transform 0.18s ease, box-shadow 0.18s ease',
                '&:hover': {
                  transform:  'translateY(-3px)',
                  boxShadow:  `0 8px 24px rgba(28,26,22,0.10)`,
                  borderColor: CLONE_TOKENS.accent + '40',
                },
              }}
            >
              {/* Icon + category */}
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.25 }}>
                <Box
                  sx={{
                    width:           44,
                    height:          44,
                    borderRadius:    '10px',
                    backgroundColor: CLONE_TOKENS.accentLight,
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    fontSize:        '1.4rem',
                  }}
                >
                  {agent.icon}
                </Box>
                <Box
                  sx={{
                    px:              '8px',
                    py:              '3px',
                    borderRadius:    '2rem',
                    backgroundColor: CLONE_TOKENS.bg,
                    border:          `1px solid ${CLONE_TOKENS.border}`,
                    fontSize:        '0.65rem',
                    fontWeight:      600,
                    color:           CLONE_TOKENS.text2,
                  }}
                >
                  {agent.category}
                </Box>
              </Stack>

              {/* Name */}
              <Typography
                sx={{
                  fontFamily:  '"Syne", sans-serif',
                  fontSize:    '0.925rem',
                  fontWeight:  700,
                  color:       CLONE_TOKENS.text,
                  mb:          0.5,
                }}
              >
                {agent.name}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  fontSize:   '0.78rem',
                  color:      CLONE_TOKENS.text2,
                  lineHeight: 1.5,
                  flexGrow:   1,
                  mb:         1.5,
                }}
              >
                {agent.description}
              </Typography>

              {/* Footer: uses count + Try button */}
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography sx={{ fontSize: '0.7rem', color: CLONE_TOKENS.text3 }}>
                  {agent.uses.toLocaleString()} uses
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize:    '0.72rem',
                    fontWeight:  600,
                    px:          1.25,
                    py:          0.4,
                    borderRadius: '2rem',
                    borderColor:  CLONE_TOKENS.accent,
                    color:        CLONE_TOKENS.accent,
                    '&:hover': {
                      backgroundColor: CLONE_TOKENS.accentLight,
                      borderColor:     CLONE_TOKENS.accent,
                    },
                  }}
                >
                  Try →
                </Button>
              </Stack>
            </Box>
          </Grid>
        ))}

        {/* "Build your own" card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            sx={{
              backgroundColor: 'transparent',
              border:          `2px dashed ${CLONE_TOKENS.border}`,
              borderRadius:    '12px',
              p:               '1.25rem',
              height:          '100%',
              minHeight:       160,
              display:         'flex',
              flexDirection:   'column',
              alignItems:      'center',
              justifyContent:  'center',
              cursor:          'pointer',
              gap:             1,
              transition:      'border-color 0.15s ease, background 0.15s ease',
              '&:hover': {
                borderColor:     CLONE_TOKENS.accent,
                backgroundColor: CLONE_TOKENS.accentLight,
              },
            }}
          >
            <Box
              sx={{
                width:           44,
                height:          44,
                borderRadius:    '10px',
                backgroundColor: CLONE_TOKENS.bg3,
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                fontSize:        '1.5rem',
              }}
            >
              ➕
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: CLONE_TOKENS.text2 }}>
              Build your own
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: CLONE_TOKENS.text3, textAlign: 'center' }}>
              Create a custom agent for your workflow
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
