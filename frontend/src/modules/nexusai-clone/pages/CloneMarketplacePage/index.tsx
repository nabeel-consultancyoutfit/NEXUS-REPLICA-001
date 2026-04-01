/**
 * CloneMarketplacePage — replicates nexusai-db.netlify.app marketplace view.
 *
 * Layout:
 *   Top bar: "Model Marketplace" heading + search + capability chips
 *   Lab filter tabs (scrollable)
 *   Content: left filter rail (via CloneMarketLayout sidebar prop) + card grid
 *
 * This component exports TWO things:
 *   1. CloneMarketplacePage — the main page content
 *   2. CloneMarketplaceSidebar — the filter rail, passed to CloneMarketLayout
 */
import React, { useState, useMemo } from 'react';
import { Box, Typography, Stack, Grid, FormGroup, FormControlLabel, Checkbox, Slider, Divider, Button } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import CloneSearchBar from '../../components/CloneSearchBar';
import CloneCategoryChip from '../../components/CloneCategoryChip';
import CloneModelCard from '../../components/CloneModelCard';
import { CLONE_MOCK_MODELS, CLONE_PROVIDERS, CLONE_CAPABILITIES } from '../../mock';
import type { CloneModel } from '../../types';

// ─── Filter state ──────────────────────────────────────────────────────────
interface MarketFilters {
  search:      string;
  capability:  string;   // from top chip bar
  providers:   string[];
  pricingTypes: string[];
  maxPrice:    number;
  minRating:   number | null;
  licences:    string[];
}

const INITIAL_FILTERS: MarketFilters = {
  search: '', capability: 'All', providers: [],
  pricingTypes: [], maxPrice: 100, minRating: null, licences: [],
};

// ─── Left filter rail (passed to layout as sidebar prop) ───────────────────
interface SidebarProps {
  filters:    MarketFilters;
  setFilters: React.Dispatch<React.SetStateAction<MarketFilters>>;
  total:      number;
}

export function CloneMarketplaceSidebar({ filters, setFilters, total }: SidebarProps) {
  const topProviders = CLONE_PROVIDERS.slice(0, 6);

  const toggle = (key: 'providers' | 'pricingTypes' | 'licences', value: string) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));

  const hasFilters = filters.providers.length > 0 || filters.pricingTypes.length > 0
    || filters.licences.length > 0 || filters.maxPrice < 100 || filters.minRating !== null;

  const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.09em', color: CLONE_TOKENS.text3, mb: 1 }}>
        {label}
      </Typography>
      {children}
    </Box>
  );

  return (
    <Box>
      {/* Need help? */}
      <Box
        sx={{
          p: 1.5, mb: 2, borderRadius: '10px',
          backgroundColor: CLONE_TOKENS.accentLight,
          border: `1px solid ${CLONE_TOKENS.accent}20`,
        }}
      >
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: CLONE_TOKENS.accent, mb: 0.5 }}>
          + Need help choosing?
        </Typography>
        <Typography sx={{ fontSize: '0.7rem', color: CLONE_TOKENS.text2, lineHeight: 1.4 }}>
          Chat with our AI guide for a personalised recommendation in 60 seconds.
        </Typography>
      </Box>

      {hasFilters && (
        <Button
          size="small"
          onClick={() => setFilters(INITIAL_FILTERS)}
          sx={{ mb: 1.5, fontSize: '0.7rem', color: CLONE_TOKENS.accent, p: 0, minWidth: 0 }}
        >
          Clear all filters
        </Button>
      )}

      <Section label="PROVIDER">
        <FormGroup>
          {topProviders.map((p) => (
            <FormControlLabel
              key={p}
              control={
                <Checkbox
                  size="small"
                  checked={filters.providers.includes(p)}
                  onChange={() => toggle('providers', p)}
                  sx={{ p: '2px 6px', '&.Mui-checked': { color: CLONE_TOKENS.accent } }}
                />
              }
              label={<Typography sx={{ fontSize: '0.78rem', color: CLONE_TOKENS.text2 }}>{p}</Typography>}
            />
          ))}
        </FormGroup>
      </Section>

      <Divider sx={{ borderColor: CLONE_TOKENS.border, mb: 2 }} />

      <Section label="PRICING MODEL">
        {(['pay-per-use', 'subscription', 'free', 'enterprise'] as const).map((t) => (
          <FormControlLabel
            key={t}
            control={
              <Checkbox
                size="small"
                checked={filters.pricingTypes.includes(t)}
                onChange={() => toggle('pricingTypes', t)}
                sx={{ p: '2px 6px', '&.Mui-checked': { color: CLONE_TOKENS.accent } }}
              />
            }
            label={<Typography sx={{ fontSize: '0.78rem', color: CLONE_TOKENS.text2, textTransform: 'capitalize' }}>{t.replace('-', ' ')}</Typography>}
          />
        ))}
      </Section>

      <Divider sx={{ borderColor: CLONE_TOKENS.border, mb: 2 }} />

      <Section label="MAX PRICE /1M TOKENS">
        <Typography sx={{ fontSize: '0.75rem', color: CLONE_TOKENS.text2, mb: 1 }}>
          Up to ${filters.maxPrice}
        </Typography>
        <Slider
          value={filters.maxPrice}
          onChange={(_, v) => setFilters((prev) => ({ ...prev, maxPrice: v as number }))}
          min={0} max={100} step={1}
          sx={{ color: CLONE_TOKENS.accent, py: 0.75 }}
        />
      </Section>

      <Divider sx={{ borderColor: CLONE_TOKENS.border, mb: 2 }} />

      <Section label="MIN RATING">
        <Stack direction="row" spacing={1}>
          {[null, 4, 4.5].map((val) => (
            <Box
              key={String(val)}
              onClick={() => setFilters((prev) => ({ ...prev, minRating: val }))}
              sx={{
                px: '10px', py: '4px', borderRadius: '2rem', cursor: 'pointer',
                fontSize: '0.72rem', fontWeight: 600,
                border: `1px solid ${filters.minRating === val ? CLONE_TOKENS.accent : CLONE_TOKENS.border}`,
                backgroundColor: filters.minRating === val ? CLONE_TOKENS.accent : CLONE_TOKENS.white,
                color: filters.minRating === val ? '#fff' : CLONE_TOKENS.text2,
              }}
            >
              {val === null ? 'Any' : `${val}+`} ★
            </Box>
          ))}
        </Stack>
      </Section>

      <Divider sx={{ borderColor: CLONE_TOKENS.border, mb: 2 }} />

      <Section label="LICENCE">
        {(['commercial', 'open-source', 'research-only'] as const).map((l) => (
          <FormControlLabel
            key={l}
            control={
              <Checkbox
                size="small"
                checked={filters.licences.includes(l)}
                onChange={() => toggle('licences', l)}
                sx={{ p: '2px 6px', '&.Mui-checked': { color: CLONE_TOKENS.accent } }}
              />
            }
            label={<Typography sx={{ fontSize: '0.78rem', color: CLONE_TOKENS.text2, textTransform: 'capitalize' }}>{l.replace('-', ' ')}</Typography>}
          />
        ))}
      </Section>
    </Box>
  );
}

// ─── Main page content ─────────────────────────────────────────────────────
export default function CloneMarketplacePage() {
  const [filters, setFilters] = useState<MarketFilters>(INITIAL_FILTERS);

  const filtered: CloneModel[] = useMemo(() => {
    let results = [...CLONE_MOCK_MODELS];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter((m) =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.capabilities.some((c) => c.toLowerCase().includes(q)),
      );
    }
    if (filters.capability !== 'All') {
      results = results.filter((m) =>
        m.capabilities.some((c) => c.toLowerCase().includes(filters.capability.toLowerCase())),
      );
    }
    if (filters.providers.length > 0) {
      results = results.filter((m) => filters.providers.includes(m.provider));
    }
    if (filters.pricingTypes.length > 0) {
      results = results.filter((m) => filters.pricingTypes.includes(m.pricingType));
    }
    if (filters.maxPrice < 100) {
      results = results.filter((m) => m.pricePerMToken == null || m.pricePerMToken <= filters.maxPrice);
    }
    if (filters.minRating !== null) {
      results = results.filter((m) => m.rating >= filters.minRating!);
    }
    if (filters.licences.length > 0) {
      results = results.filter((m) => filters.licences.includes(m.licence));
    }
    return results;
  }, [filters]);

  // The sidebar is rendered by the Next.js routing page via the `sidebar` prop on CloneMarketLayout
  // We expose filters state so the page can thread it through
  (CloneMarketplacePage as any).__filters   = filters;
  (CloneMarketplacePage as any).__setFilters = setFilters;

  return (
    <Box sx={{ p: '1.5rem' }}>
      {/* ── Header row ─────────────────────────────────── */}
      <Stack direction="row" alignItems="center" gap={2} sx={{ mb: 2 }} flexWrap="wrap">
        <Typography
          variant="h5"
          sx={{
            fontFamily:  '"Syne", sans-serif',
            fontWeight:  700,
            color:       CLONE_TOKENS.text,
            letterSpacing: '-0.02em',
            flexShrink:  0,
          }}
        >
          Model Marketplace
        </Typography>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <CloneSearchBar
            placeholder="Search models, capabilities..."
            value={filters.search}
            onChange={(v) => setFilters((prev) => ({ ...prev, search: v }))}
          />
        </Box>
      </Stack>

      {/* ── Capability chips ────────────────────────────── */}
      <Stack direction="row" spacing={1} sx={{ mb: 2, overflowX: 'auto', pb: 0.5 }}>
        {CLONE_CAPABILITIES.map((cap) => (
          <CloneCategoryChip
            key={cap}
            label={cap}
            active={filters.capability === cap}
            onClick={() => setFilters((prev) => ({ ...prev, capability: cap }))}
          />
        ))}
      </Stack>

      {/* ── Lab filter tabs ─────────────────────────────── */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mb:           2,
          overflowX:    'auto',
          pb:           0.5,
          borderBottom: `1px solid ${CLONE_TOKENS.border}`,
          '&::-webkit-scrollbar': { height: 0 },
        }}
      >
        {['All Labs (139)', 'OpenAI (11)', 'Anthropic (8)', 'Google DeepMind (8)',
          'Meta (8)', 'DeepSeek (6)', 'Alibaba (Qwen) (9)', 'xAI / Grok (6)',
          'Mistral AI (5)', 'Cohere (5)', 'Microsoft (6)', 'Amazon (5)'].map((lab, i) => (
          <Box
            key={lab}
            sx={{
              px:          '12px',
              py:          '6px',
              whiteSpace:  'nowrap',
              fontSize:    '0.78rem',
              fontWeight:  i === 0 ? 700 : 500,
              color:       i === 0 ? CLONE_TOKENS.accent : CLONE_TOKENS.text2,
              borderBottom: i === 0 ? `2px solid ${CLONE_TOKENS.accent}` : '2px solid transparent',
              cursor:      'pointer',
              '&:hover':   { color: CLONE_TOKENS.accent },
            }}
          >
            {lab}
          </Box>
        ))}
      </Stack>

      {/* ── Results count + grid ───────────────────────── */}
      <Typography sx={{ fontSize: '0.78rem', color: CLONE_TOKENS.text3, mb: 2 }}>
        Showing {filtered.length} of {CLONE_MOCK_MODELS.length} models
      </Typography>

      {filtered.length > 0 ? (
        <Grid container spacing={2}>
          {filtered.map((model) => (
            <Grid key={model.id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <CloneModelCard model={model} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography sx={{ fontSize: '2rem', mb: 1 }}>🔍</Typography>
          <Typography sx={{ fontWeight: 600, color: CLONE_TOKENS.text, mb: 0.5 }}>No models found</Typography>
          <Typography sx={{ fontSize: '0.875rem', color: CLONE_TOKENS.text2 }}>Try adjusting your filters</Typography>
        </Box>
      )}
    </Box>
  );
}
