/**
 * CloneDiscoverPage — replicates the "Discover New" page at nexusai-db.netlify.app.
 *
 * Shows: research feed cards with tags, source, date, and a new-release badge.
 * Uses CloneMarketLayout (Navbar only variant without left filter sidebar).
 */
import React, { useState } from 'react';
import { Box, Typography, Grid, Stack, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import CloneSearchBar from '../../components/CloneSearchBar';
import CloneCategoryChip from '../../components/CloneCategoryChip';
import { CLONE_MOCK_RESEARCH } from '../../mock';

const RESEARCH_FILTERS = ['All', 'Safety', 'Architecture', 'Alignment', 'Benchmarks', 'Fine-tuning', 'Scaling'];

export default function CloneDiscoverPage() {
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('All');

  const filtered = CLONE_MOCK_RESEARCH.filter((r) => {
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || r.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()));
    return matchSearch && matchFilter;
  });

  return (
    <Box sx={{ p: '1.75rem', backgroundColor: CLONE_TOKENS.bg, minHeight: '100%' }}>
      {/* ── Header ─────────────────────────────────────── */}
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
        <AutoAwesomeIcon sx={{ color: CLONE_TOKENS.accent, fontSize: 22 }} />
        <Typography
          variant="h5"
          sx={{
            fontFamily:  '"Syne", sans-serif',
            fontWeight:  700,
            color:       CLONE_TOKENS.text,
            letterSpacing: '-0.02em',
          }}
        >
          Discover New
        </Typography>
      </Stack>
      <Typography sx={{ fontSize: '0.875rem', color: CLONE_TOKENS.text2, mb: 2.5 }}>
        Latest research, model releases, and AI breakthroughs — updated daily.
      </Typography>

      {/* ── Search + filter chips ───────────────────────── */}
      <Box sx={{ mb: 2 }}>
        <CloneSearchBar
          placeholder="Search research papers, topics..."
          value={search}
          onChange={setSearch}
        />
      </Box>
      <Stack direction="row" spacing={1} sx={{ mb: 3, overflowX: 'auto', pb: 0.5 }}>
        {RESEARCH_FILTERS.map((f) => (
          <CloneCategoryChip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </Stack>

      {/* ── Research cards ─────────────────────────────── */}
      <Grid container spacing={2}>
        {filtered.map((item) => (
          <Grid key={item.id} item xs={12} md={6} lg={4}>
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
                },
              }}
            >
              {/* Source + date + new badge */}
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.25 }}>
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: CLONE_TOKENS.accent }}>
                  {item.source}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {item.isNew && (
                    <Box
                      sx={{
                        px: '8px', py: '2px', borderRadius: '6px',
                        backgroundColor: CLONE_TOKENS.tealLight,
                        color: CLONE_TOKENS.teal,
                        fontSize: '0.62rem', fontWeight: 700,
                      }}
                    >
                      NEW
                    </Box>
                  )}
                  <Typography sx={{ fontSize: '0.68rem', color: CLONE_TOKENS.text3 }}>
                    {item.date}
                  </Typography>
                </Stack>
              </Stack>

              {/* Title */}
              <Typography
                sx={{
                  fontSize:    '0.9rem',
                  fontWeight:  700,
                  color:       CLONE_TOKENS.text,
                  lineHeight:  1.35,
                  mb:          0.75,
                  fontFamily:  '"Syne", sans-serif',
                }}
              >
                {item.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  fontSize:            '0.8rem',
                  color:               CLONE_TOKENS.text2,
                  lineHeight:          1.5,
                  mb:                  1.5,
                  flexGrow:            1,
                  display:             '-webkit-box',
                  WebkitLineClamp:     3,
                  WebkitBoxOrient:     'vertical',
                  overflow:            'hidden',
                }}
              >
                {item.description}
              </Typography>

              {/* Tags */}
              <Stack direction="row" flexWrap="wrap" gap={0.75}>
                {item.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      height:          22,
                      fontSize:        '0.65rem',
                      fontWeight:      500,
                      backgroundColor: CLONE_TOKENS.bg,
                      color:           CLONE_TOKENS.text2,
                      border:          `1px solid ${CLONE_TOKENS.border}`,
                      borderRadius:    '2rem',
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
