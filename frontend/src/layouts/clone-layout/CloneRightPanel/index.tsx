/**
 * CloneRightPanel — 272px fixed right panel from Chat Hub view.
 *
 * Shows:
 *   QUICK ACTIONS (heading)
 *   NAVIGATION & TOOLS section
 *   CREATE & GENERATE section
 *   ANALYZE & WRITE section
 */
import React, { useMemo } from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import { CLONE_MOCK_MODELS } from '@/modules/nexusai-clone/mock';

interface PanelLink {
  icon: string;
  label: string;
}

interface PanelSection {
  heading: string;
  links: PanelLink[];
}

const PANEL_SECTIONS: PanelSection[] = [
  {
    heading: 'NAVIGATION & TOOLS',
    links: [
      { icon: '🛒', label: 'Browse Marketplace'   },
      { icon: '🤖', label: 'Build an Agent'        },
      { icon: '📖', label: 'How to use Guide'       },
      { icon: '✏️', label: 'Prompt Engineering'    },
      { icon: '💰', label: 'View Pricing'           },
      { icon: '📊', label: 'AI Models Analysis'     },
    ],
  },
  {
    heading: 'CREATE & GENERATE',
    links: [
      { icon: '🖼️', label: 'Create Image'          },
      { icon: '🎵', label: 'Generate Audio'         },
      { icon: '🎬', label: 'Create Video'           },
      { icon: '📐', label: 'Create Slides'          },
      { icon: '📈', label: 'Create Infographs'      },
      { icon: '❓', label: 'Create Quiz'            },
      { icon: '🗃️', label: 'Create Flashcards'     },
      { icon: '🗺️', label: 'Create Mind Map'       },
    ],
  },
  {
    heading: 'ANALYZE & WRITE',
    links: [
      { icon: '🔍', label: 'Analyze Data'           },
      { icon: '✍️', label: 'Write Content'          },
      { icon: '💻', label: 'Code Generation'         },
      { icon: '📄', label: 'Document Analysis'       },
      { icon: '🌐', label: 'Translate'               },
    ],
  },
];

const USAGE_BARS = [42, 58, 37, 74, 46, 39, 43, 61, 55, 69, 64, 83, 52, 71, 48, 41];

interface CloneRightPanelProps {
  selectedModelId?: string;
  showActiveModel?: boolean;
}

function formatPrice(pricePerMToken?: number) {
  if (pricePerMToken === undefined) return 'Free';
  return `$${pricePerMToken}`;
}

export default function CloneRightPanel({
  selectedModelId = 'gpt-5',
  showActiveModel = false,
}: CloneRightPanelProps) {
  const activeModel = useMemo(
    () => CLONE_MOCK_MODELS.find((model) => model.id === selectedModelId) ?? CLONE_MOCK_MODELS[0],
    [selectedModelId],
  );

  return (
    <Box
      sx={{
        width:           `${CLONE_TOKENS.rightPanelWidth}px`,
        flexShrink:      0,
        height:          `calc(100vh - ${CLONE_TOKENS.navbarHeight}px)`,
        position:        'sticky',
        top:             `${CLONE_TOKENS.navbarHeight}px`,
        overflowY:       'auto',
        overflowX:       'hidden',
        backgroundColor: CLONE_TOKENS.white,
        borderLeft:      `1px solid ${CLONE_TOKENS.border}`,
        px:              2,
        py:              2,

        '&::-webkit-scrollbar':       { width: 4 },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { background: CLONE_TOKENS.bg3, borderRadius: 4 },
      }}
    >
      {showActiveModel && (
        <>
          <Typography
            sx={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: CLONE_TOKENS.text3,
              mb: 1.25,
            }}
          >
            ACTIVE MODEL
          </Typography>

          <Box
            sx={{
              p: 1.5,
              mb: 2.25,
              borderRadius: '14px',
              border: `1px solid ${CLONE_TOKENS.border}`,
              backgroundColor: '#FCFAF7',
              boxShadow: '0 10px 24px rgba(28,26,22,0.05)',
            }}
          >
            <Stack direction="row" alignItems="flex-start" spacing={1.1} sx={{ mb: 1.3 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  backgroundColor: activeModel.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  flexShrink: 0,
                }}
              >
                {activeModel.icon}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: CLONE_TOKENS.text, lineHeight: 1.2 }}>
                  {activeModel.name}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: CLONE_TOKENS.text3 }}>
                  by {activeModel.provider}
                </Typography>
              </Box>
              <Box
                sx={{
                  px: '10px',
                  py: '4px',
                  borderRadius: '999px',
                  border: `1px solid #AEE7D3`,
                  backgroundColor: '#EAF9F2',
                  color: '#14805E',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                }}
              >
                Live
              </Box>
            </Stack>

            <Typography sx={{ fontSize: '0.9rem', color: CLONE_TOKENS.text2, lineHeight: 1.55, mb: 1.5 }}>
              {activeModel.description}
            </Typography>

            <Stack direction="row" spacing={0.9} sx={{ mb: 1.3 }}>
              {[
                { label: 'CONTEXT', value: activeModel.contextWindow ?? '128K' },
                { label: '/1M TK', value: formatPrice(activeModel.pricePerMToken) },
                { label: 'RATING', value: `${activeModel.rating.toFixed(1)}★` },
              ].map((stat) => (
                <Box
                  key={stat.label}
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    px: 1,
                    py: 1,
                    borderRadius: '10px',
                    border: `1px solid ${CLONE_TOKENS.border}`,
                    backgroundColor: CLONE_TOKENS.white,
                    textAlign: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: '1.05rem', fontWeight: 800, color: CLONE_TOKENS.text, mb: '2px' }}>
                    {stat.value}
                  </Typography>
                  <Typography sx={{ fontSize: '0.68rem', color: CLONE_TOKENS.text3, letterSpacing: '0.04em' }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Stack direction="row" spacing={1}>
              <Box
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  px: 1.1,
                  py: 0.8,
                  borderRadius: '10px',
                  border: `1px solid ${CLONE_TOKENS.border}`,
                  backgroundColor: CLONE_TOKENS.white,
                  color: CLONE_TOKENS.text2,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
              >
                Details
              </Box>
              <Box
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  px: 1.1,
                  py: 0.8,
                  borderRadius: '10px',
                  border: `1px solid #F2C5A6`,
                  backgroundColor: '#FFF4EC',
                  color: CLONE_TOKENS.accent,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                }}
              >
                Pricing
              </Box>
            </Stack>
          </Box>

          <Typography
            sx={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: CLONE_TOKENS.text3,
              mb: 1.25,
            }}
          >
            USAGE OVERVIEW
          </Typography>

          <Stack direction="row" spacing={0.9} sx={{ mb: 1.3 }}>
            {[
              { label: 'REQUESTS', value: '2,663' },
              { label: 'AVG LATENCY', value: '1.1S' },
              { label: 'COST (TODAY)', value: '$2.79' },
            ].map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  px: 0.85,
                  py: 1,
                  borderRadius: '10px',
                  border: `1px solid ${CLONE_TOKENS.border}`,
                  backgroundColor: CLONE_TOKENS.white,
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.68rem',
                    color: CLONE_TOKENS.text3,
                    letterSpacing: '0.04em',
                    mb: '4px',
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, color: CLONE_TOKENS.text }}>
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Box
            sx={{
              mb: 2.25,
              p: 1.1,
              borderRadius: '12px',
              border: `1px solid ${CLONE_TOKENS.border}`,
              backgroundColor: '#FCFAF7',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: 78,
                display: 'flex',
                alignItems: 'flex-end',
                overflow: 'hidden',
                position: 'relative',
                '@keyframes usageBarsMarquee': {
                  '0%': { transform: 'translateX(0)' },
                  '100%': { transform: 'translateX(-50%)' },
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '4px',
                  minWidth: 'max-content',
                  animation: 'usageBarsMarquee 10s linear infinite',
                }}
              >
                {[...USAGE_BARS, ...USAGE_BARS].map((height, index) => (
                  <Box
                    key={`${height}-${index}`}
                    sx={{
                      width: 9,
                      height: `${height}px`,
                      borderRadius: '999px',
                      background: 'linear-gradient(180deg, #7DA6F4 0%, #3A6FCE 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)',
                      flexShrink: 0,
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </>
      )}

      {/* Top heading */}
      <Typography
        sx={{
          fontSize:      '0.7rem',
          fontWeight:    700,
          letterSpacing: '0.1em',
          color:         CLONE_TOKENS.text3,
          mb:            2,
        }}
      >
        QUICK ACTIONS
      </Typography>

      {PANEL_SECTIONS.map((section, si) => (
        <Box key={section.heading} sx={{ mb: 2 }}>
          {si > 0 && <Divider sx={{ borderColor: CLONE_TOKENS.border, mb: 2 }} />}

          <Typography
            sx={{
              fontSize:      '0.65rem',
              fontWeight:    700,
              letterSpacing: '0.1em',
              color:         CLONE_TOKENS.text3,
              mb:            1,
            }}
          >
            {section.heading}
          </Typography>

          <Stack spacing={0.25}>
            {section.links.map(({ icon, label }) => (
              <Box
                key={label}
                sx={{
                  display:         'flex',
                  alignItems:      'center',
                  gap:             1,
                  px:              1,
                  py:              0.625,
                  borderRadius:    '8px',
                  border:          `1px solid ${CLONE_TOKENS.border}`,
                  backgroundColor: CLONE_TOKENS.white,
                  cursor:          'pointer',
                  transition:      'background 0.12s ease, border-color 0.12s ease',
                  '&:hover': {
                    backgroundColor: CLONE_TOKENS.bg,
                    borderColor:     CLONE_TOKENS.accentLight,
                  },
                }}
              >
                <Box sx={{ fontSize: '0.875rem', flexShrink: 0, width: 20 }}>
                  {icon}
                </Box>
                <Typography
                  sx={{
                    fontSize:    '0.8rem',
                    color:       CLONE_TOKENS.text2,
                    fontWeight:  400,
                    '&:hover':   { color: CLONE_TOKENS.accent },
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
}