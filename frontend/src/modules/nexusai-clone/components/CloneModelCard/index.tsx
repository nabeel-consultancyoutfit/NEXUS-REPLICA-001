/**
 * CloneModelCard — model card replicating the cards on nexusai-db.netlify.app/marketplace.
 *
 * Layout: icon + name + provider + badge | description | capability chips | rating + price + CTA
 */
import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import CloneBadge from '../CloneBadge';
import type { CloneModel } from '../../types';

interface CloneModelCardProps {
  model:     CloneModel;
  onClick?:  () => void;
}

export default function CloneModelCard({ model, onClick }: CloneModelCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: CLONE_TOKENS.white,
        border:          `1px solid ${CLONE_TOKENS.border}`,
        borderRadius:    '12px',
        p:               '1.25rem',
        cursor:          onClick ? 'pointer' : 'default',
        height:          '100%',
        display:         'flex',
        flexDirection:   'column',
        gap:             1,
        transition:      'transform 0.18s ease, box-shadow 0.18s ease',
        '&:hover': {
          transform:  'translateY(-3px)',
          boxShadow:  `0 8px 24px rgba(28,26,22,0.10)`,
        },
      }}
    >
      {/* ── Top row: icon + name/provider + badge ──────── */}
      <Stack direction="row" alignItems="flex-start" spacing={1.25}>
        {/* Icon tile */}
        <Box
          sx={{
            width:        36,
            height:       36,
            borderRadius: '8px',
            backgroundColor: model.iconBg,
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            fontSize:     '1.1rem',
            flexShrink:   0,
          }}
        >
          {model.icon}
        </Box>

        {/* Name + provider */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize:    '0.875rem',
              fontWeight:  700,
              color:       CLONE_TOKENS.text,
              lineHeight:  1.3,
              whiteSpace:  'nowrap',
              overflow:    'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {model.name}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.75rem',
              color:    CLONE_TOKENS.text3,
              mt:       '1px',
            }}
          >
            {model.provider}
          </Typography>
        </Box>

        {/* Badge */}
        <CloneBadge badge={model.badge} />
      </Stack>

      {/* ── Description ────────────────────────────────── */}
      <Typography
        sx={{
          fontSize:   '0.78rem',
          color:      CLONE_TOKENS.text2,
          lineHeight: 1.5,
          display:    '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow:   'hidden',
          flexGrow:   1,
        }}
      >
        {model.description}
      </Typography>

      {/* ── Capability chips ───────────────────────────── */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {model.capabilities.slice(0, 3).map((cap) => (
          <Box
            key={cap}
            sx={{
              px:              '8px',
              py:              '2px',
              borderRadius:    '2rem',
              backgroundColor: CLONE_TOKENS.bg,
              color:           CLONE_TOKENS.text2,
              fontSize:        '0.65rem',
              fontWeight:      500,
              border:          `1px solid ${CLONE_TOKENS.border}`,
            }}
          >
            {cap}
          </Box>
        ))}
      </Box>

      {/* ── Footer: rating + price + CTA ───────────────── */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 'auto', pt: 0.5 }}>
        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <StarIcon sx={{ fontSize: 13, color: '#FBBF24' }} />
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: CLONE_TOKENS.text }}>
            {model.rating.toFixed(1)}
          </Typography>
          <Typography sx={{ fontSize: '0.68rem', color: CLONE_TOKENS.text3 }}>
            ({model.reviewCount.toLocaleString()})
          </Typography>
        </Stack>

        {/* Price */}
        <Stack direction="row" alignItems="center" spacing={1}>
          {model.pricePerMToken !== undefined ? (
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: CLONE_TOKENS.text }}>
              ${model.pricePerMToken.toFixed(2)}/1M tk
            </Typography>
          ) : (
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: CLONE_TOKENS.green }}>
              Free
            </Typography>
          )}

          {/* How to Use link */}
          <Typography
            sx={{
              fontSize:   '0.72rem',
              fontWeight: 600,
              color:      CLONE_TOKENS.accent,
              cursor:     'pointer',
              whiteSpace: 'nowrap',
              '&:hover':  { textDecoration: 'underline' },
            }}
          >
            How to Use →
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
