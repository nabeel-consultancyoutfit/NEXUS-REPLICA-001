/**
 * Clone Theme — matches nexusai-db.netlify.app exactly.
 * DO NOT import from this file inside the existing workspace app.
 * Only used by CloneAppShell and modules/nexusai pages.
 */
import { createTheme, ThemeOptions } from '@mui/material/styles';

// ─── Design Tokens (extracted from reference site CSS variables) ────────────
export const CLONE_TOKENS = {
  // Accent
  accent:        '#C8622A',
  accentDark:    '#A34D1E',
  accentLight:   '#FDF1EB',

  // Backgrounds
  bg:            '#F4F2EE',
  bg2:           '#ECEAE4',
  bg3:           '#E4E1D8',
  white:         '#FFFFFF',

  // Text
  text:          '#1C1A16',
  text2:         '#5A5750',
  text3:         '#9E9B93',

  // Semantic colours
  blue:          '#1E4DA8',
  blueLight:     '#EBF0FC',
  teal:          '#0A5E49',
  tealLight:     '#E2F5EF',
  amber:         '#8A5A00',
  amberLight:    '#FDF5E0',
  rose:          '#9B2042',
  roseLight:     '#FDEDF1',
  green:         '#2E9E5B',

  // Border
  border:        '#E4E1D8',

  // Sidebar / panels
  sidebarWidth:  252,
  rightPanelWidth: 272,
  navbarHeight:  52,
} as const;

const cloneThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main:          CLONE_TOKENS.accent,
      dark:          CLONE_TOKENS.accentDark,
      light:         CLONE_TOKENS.accentLight,
      contrastText:  '#FFFFFF',
    },
    secondary: {
      main:          CLONE_TOKENS.blue,
      light:         CLONE_TOKENS.blueLight,
      contrastText:  '#FFFFFF',
    },
    success: {
      main:          CLONE_TOKENS.green,
      light:         CLONE_TOKENS.tealLight,
    },
    warning: {
      main:          CLONE_TOKENS.amber,
      light:         CLONE_TOKENS.amberLight,
    },
    error: {
      main:          CLONE_TOKENS.rose,
      light:         CLONE_TOKENS.roseLight,
    },
    background: {
      default:       CLONE_TOKENS.bg,
      paper:         CLONE_TOKENS.white,
    },
    text: {
      primary:       CLONE_TOKENS.text,
      secondary:     CLONE_TOKENS.text2,
      disabled:      CLONE_TOKENS.text3,
    },
    divider:         CLONE_TOKENS.border,
  },

  typography: {
    // Body: Instrument Sans (Google Fonts, loaded via CloneAppShell)
    fontFamily: '"Instrument Sans", "Inter", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily:    '"Syne", "Helvetica Neue", Arial, sans-serif',
      fontWeight:    700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily:    '"Syne", "Helvetica Neue", Arial, sans-serif',
      fontWeight:    700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily:    '"Syne", "Helvetica Neue", Arial, sans-serif',
      fontWeight:    700,
    },
    h4: {
      fontFamily:    '"Syne", "Helvetica Neue", Arial, sans-serif',
      fontWeight:    700,
    },
    h5: {
      fontFamily:    '"Syne", "Helvetica Neue", Arial, sans-serif',
      fontWeight:    600,
    },
    h6: {
      fontFamily:    '"Syne", "Helvetica Neue", Arial, sans-serif',
      fontWeight:    600,
    },
    button: {
      fontFamily:    '"Instrument Sans", "Inter", Arial, sans-serif',
      fontWeight:    600,
      textTransform: 'none' as const,
      letterSpacing: '0em',
    },
    caption: {
      fontSize:      '0.7rem',
      color:         CLONE_TOKENS.text3,
    },
  },

  shape: {
    borderRadius: 12,
  },

  shadows: [
    'none',
    `0 1px 4px rgba(28,26,22,0.06)`,
    `0 2px 8px rgba(28,26,22,0.08)`,
    `0 2px 12px rgba(28,26,22,0.12)`,
    `0 4px 16px rgba(28,26,22,0.12)`,
    `0 4px 20px rgba(28,26,22,0.14)`,
    `0 8px 24px rgba(28,26,22,0.14)`,
    `0 8px 32px rgba(28,26,22,0.16)`,
    `0 8px 40px rgba(28,26,22,0.16)`,
    `0 12px 48px rgba(28,26,22,0.18)`,
    `0 12px 56px rgba(28,26,22,0.18)`,
    `0 16px 64px rgba(28,26,22,0.20)`,
    `0 16px 72px rgba(28,26,22,0.20)`,
    `0 20px 80px rgba(28,26,22,0.22)`,
    `0 20px 88px rgba(28,26,22,0.22)`,
    `0 24px 96px rgba(28,26,22,0.24)`,
    `0 24px 96px rgba(28,26,22,0.24)`,
    `0 28px 104px rgba(28,26,22,0.24)`,
    `0 28px 104px rgba(28,26,22,0.24)`,
    `0 32px 112px rgba(28,26,22,0.26)`,
    `0 32px 112px rgba(28,26,22,0.26)`,
    `0 36px 120px rgba(28,26,22,0.28)`,
    `0 36px 120px rgba(28,26,22,0.28)`,
    `0 40px 128px rgba(28,26,22,0.30)`,
    `0 40px 128px rgba(28,26,22,0.30)`,
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --clone-accent:       ${CLONE_TOKENS.accent};
          --clone-accent-dark:  ${CLONE_TOKENS.accentDark};
          --clone-accent-light: ${CLONE_TOKENS.accentLight};
          --clone-bg:           ${CLONE_TOKENS.bg};
          --clone-bg2:          ${CLONE_TOKENS.bg2};
          --clone-text:         ${CLONE_TOKENS.text};
          --clone-text2:        ${CLONE_TOKENS.text2};
          --clone-text3:        ${CLONE_TOKENS.text3};
          --clone-border:       ${CLONE_TOKENS.border};
        }
      `,
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: '2rem',
          padding:      '0.55rem 1.25rem',
          fontWeight:   600,
          lineHeight:   1.4,
        },
        containedPrimary: {
          background:  `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
          color:       '#FFFFFF',
          '&:hover': {
            background: `linear-gradient(135deg, ${CLONE_TOKENS.accentDark} 0%, #8A3D10 100%)`,
          },
        },
        outlinedPrimary: {
          borderColor: CLONE_TOKENS.accent,
          color:       CLONE_TOKENS.accent,
          '&:hover': {
            backgroundColor: CLONE_TOKENS.accentLight,
          },
        },
        text: {
          '&:hover': {
            backgroundColor: CLONE_TOKENS.bg2,
          },
        },
      },
    },

    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius:  12,
          border:        `1px solid ${CLONE_TOKENS.border}`,
          padding:       '1.5rem',
          transition:    'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform:   'translateY(-3px)',
            boxShadow:   `0 8px 32px rgba(28,26,22,0.12)`,
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontSize:     '0.7rem',
          fontWeight:   500,
          height:       24,
        },
        colorPrimary: {
          backgroundColor: CLONE_TOKENS.accent,
          color:           '#FFFFFF',
        },
      },
    },

    MuiTextField: {
      defaultProps: { variant: 'outlined' as const },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: CLONE_TOKENS.white,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: CLONE_TOKENS.accent,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: CLONE_TOKENS.accent,
              borderWidth: 2,
            },
          },
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color:        CLONE_TOKENS.text3,
          '&.Mui-checked': {
            color:      CLONE_TOKENS.accent,
          },
          padding:      '4px 8px',
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: CLONE_TOKENS.border,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: CLONE_TOKENS.text,
          fontSize:        '0.75rem',
          borderRadius:    8,
        },
      },
    },
  },
};

const cloneTheme = createTheme(cloneThemeOptions);
export default cloneTheme;
