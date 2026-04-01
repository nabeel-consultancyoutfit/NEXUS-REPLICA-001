/**
 * CloneRightPanel — 272px fixed right panel from Chat Hub view.
 *
 * Shows:
 *   QUICK ACTIONS (heading)
 *   NAVIGATION & TOOLS section
 *   CREATE & GENERATE section
 *   ANALYZE & WRITE section
 */
import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

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

export default function CloneRightPanel() {
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