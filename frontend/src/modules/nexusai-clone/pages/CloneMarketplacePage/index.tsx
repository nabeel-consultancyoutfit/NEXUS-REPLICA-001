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
import React, { useMemo } from 'react';
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

const LAB_TABS = CLONE_PROVIDERS.map((provider) => ({
  provider,
  label: `${provider} (${CLONE_MOCK_MODELS.filter((model) => model.provider === provider).length})`,
}));

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

      <Typography sx={{ fontSize: '0.72rem', color: CLONE_TOKENS.text3, mb: 1.25 }}>
        Showing {total} models
      </Typography>

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
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.3,
                minWidth: val === null ? 52 : 58,
                px: '12px',
                py: '6px',
                borderRadius: '999px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                fontSize: '0.72rem',
                fontWeight: 500,
                border: `1px solid ${filters.minRating === val ? CLONE_TOKENS.accent : CLONE_TOKENS.border}`,
                backgroundColor: filters.minRating === val ? CLONE_TOKENS.accent : CLONE_TOKENS.white,
                color: filters.minRating === val ? '#fff' : CLONE_TOKENS.text2,
                flexShrink: 0,
              }}
            >
              <Box component="span">{val === null ? 'Any' : `${val}+`}</Box>
              {val !== null && (
                <Box
                  component="span"
                  sx={{
                    color: filters.minRating === val ? '#FDE7A1' : '#D6A52D',
                    fontSize: '0.8rem',
                    lineHeight: 1,
                  }}
                >
                  ★
                </Box>
              )}
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
interface CloneMarketplacePageProps {
  filters: MarketFilters;
  setFilters: React.Dispatch<React.SetStateAction<MarketFilters>>;
}

export { INITIAL_FILTERS };

export default function CloneMarketplacePage({ filters, setFilters }: CloneMarketplacePageProps) {
  const activeProviderTab = filters.providers.length === 1 ? filters.providers[0] : null;

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

  return (
    <Box sx={{ p: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}>
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
        {[{ provider: null, label: `All Labs (${CLONE_MOCK_MODELS.length})` }, ...LAB_TABS].map(({ provider, label }) => (
          <Box
            key={label}
            onClick={() => setFilters((prev) => ({
              ...prev,
              providers: provider ? [provider] : [],
            }))}
            sx={{
              px:          '12px',
              py:          '6px',
              whiteSpace:  'nowrap',
              fontSize:    '0.78rem',
              fontWeight:  activeProviderTab === provider || (!provider && filters.providers.length === 0) ? 700 : 500,
              color:       activeProviderTab === provider || (!provider && filters.providers.length === 0) ? CLONE_TOKENS.accent : CLONE_TOKENS.text2,
              borderBottom: activeProviderTab === provider || (!provider && filters.providers.length === 0)
                ? `2px solid ${CLONE_TOKENS.accent}`
                : '2px solid transparent',
              cursor:      'pointer',
              '&:hover':   { color: CLONE_TOKENS.accent },
            }}
          >
            {label}
          </Box>
        ))}
      </Stack>

      {/* ── Results count + grid ───────────────────────── */}
      <Typography sx={{ fontSize: '0.78rem', color: CLONE_TOKENS.text3, mb: 2 }}>
        Showing {filtered.length} of {CLONE_MOCK_MODELS.length} models
      </Typography>

      <Grid container spacing={{ xs: 1.25, sm: 1.5, md: 2 }}>
        {filtered.map((model) => (
          <Grid key={model.id} item xs={12} sm={6} lg={4} xl={3}>
            <CloneModelCard model={model} />
          </Grid>
        ))}
      </Grid>

      {filtered.length === 0 && (
        <Box
          sx={{
            textAlign:  'center',
            py:         8,
            color:      CLONE_TOKENS.text3,
          }}
        >
          <Typography sx={{ fontSize: '1rem', fontWeight: 600, mb: 1 }}>
            No models match your filters
          </Typography>
          <Typography sx={{ fontSize: '0.82rem' }}>
            Try adjusting your search or clearing some filters.
          </Typography>
        </Box>
      )}
    </Box>
  );
}