/**
 * CloneNavbar — sticky top navigation bar.
 *
 * Structure:
 *   LEFT:   Orange square icon + "NexusAI" wordmark
 *   CENTER: Chat Hub | Marketplace | Agents | Discover New
 *   RIGHT:  (guest) "Sign in" + "Try It" buttons
 *           (authed) User avatar → dropdown (Profile / Logout)
 *
 * Auth state comes from AuthContext — no prop drilling needed.
 */
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  ButtonBase,
  Drawer,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon        from '@mui/icons-material/Logout';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { CLONE_TOKENS }  from '@/theme/clone-theme';
import { useAuthContext } from '@/contexts/AuthContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  HOME_LANGUAGE_COPY,
  LANGUAGE_CHANGE_EVENT,
  LANGUAGE_OPTIONS,
  LANGUAGE_STORAGE_KEY,
  getStoredHomeLanguage,
} from '@/modules/nexusai-clone/i18n/homeLanguage';

// ─── Nav items ────────────────────────────────────────────────────────────────

interface NavItem { label: string; href: string }

// ─── Component ────────────────────────────────────────────────────────────────

export default function CloneNavbar() {
  const router                     = useRouter();
  const { user, isAuthenticated, logout } = useAuthContext();
  const isHomePage = router.pathname === '/ai';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Dropdown anchor for authenticated avatar menu
  const [anchorEl, setAnchorEl]    = useState<HTMLElement | null>(null);
  const menuOpen                   = Boolean(anchorEl);
  const [languageAnchorEl, setLanguageAnchorEl] = useState<HTMLElement | null>(null);
  const languageMenuOpen = Boolean(languageAnchorEl);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<string>('EN');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const openMenu  = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const openLanguageMenu = (e: React.MouseEvent<HTMLElement>) => setLanguageAnchorEl(e.currentTarget);
  const closeLanguageMenu = () => setLanguageAnchorEl(null);
  const closeMobileNav = () => setMobileNavOpen(false);

  useEffect(() => {
    const syncLanguage = () => setSelectedLanguageCode(getStoredHomeLanguage());
    syncLanguage();
    window.addEventListener(LANGUAGE_CHANGE_EVENT, syncLanguage);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, syncLanguage);
  }, []);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguageCode(languageCode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
      window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
    }
    closeLanguageMenu();
  };

  const handleLogout = () => {
    closeMenu();
    logout();
    // Stay in the app — guest can still use everything
  };

  // Derive avatar initials from name or email
  const avatarInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : '?';

  const displayName  = user?.name  || user?.email || 'User';
  const displayEmail = user?.email || '';
  const selectedLanguage = LANGUAGE_OPTIONS.find((option) => option.code === selectedLanguageCode) ?? LANGUAGE_OPTIONS[0];
  const copy = HOME_LANGUAGE_COPY[selectedLanguage.code];
  const navItems: NavItem[] = [
    { label: copy.navbar.chatHub, href: '/ai/chat' },
    { label: copy.navbar.marketplace, href: '/ai/marketplace' },
    { label: copy.navbar.agents, href: '/ai/agents' },
    { label: copy.navbar.discoverNew, href: '/ai/discover' },
  ];

  return (
    <Box
      component="header"
      sx={{
        position:             'sticky',
        top:                  0,
        zIndex:               1200,
        height:               `${CLONE_TOKENS.navbarHeight}px`,
        display:              'flex',
        alignItems:           'center',
        justifyContent:       'space-between',
        px:                   { xs: 1.25, sm: 1.75, md: '2rem' },
        backgroundColor:      'rgba(255,255,255,0.92)',
        backdropFilter:       'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom:         `1px solid ${CLONE_TOKENS.border}`,
      }}
    >
      {/* ── LEFT: Logo ─────────────────────────────────────── */}
      <Box component={NextLink} href="/ai" sx={{ textDecoration: 'none' }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer' }}>
          <Box
            sx={{
              width:           28,
              height:          28,
              borderRadius:    '6px',
              background:      `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              flexShrink:      0,
            }}
          >
            <Box
              sx={{
                width:           10,
                height:          10,
                borderRadius:    '2px',
                backgroundColor: 'rgba(255,255,255,0.85)',
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily:    '"Syne", sans-serif',
              fontWeight:    700,
              fontSize:      { xs: '0.92rem', sm: '1rem' },
              color:         CLONE_TOKENS.text,
              letterSpacing: '-0.01em',
            }}
          >
            NexusAI
          </Typography>
        </Stack>
      </Box>

      {/* ── CENTER: Nav links ───────────────────────────────── */}
      {!isMobile && (
        <Stack direction="row" spacing={0.5} alignItems="center">
          {navItems.map(({ label, href }) => {
            const active =
              router.pathname === href || router.pathname.startsWith(href + '/');
            return (
              <Box
                key={href}
                component={NextLink}
                href={href}
                sx={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    px:           1.5,
                    py:           0.75,
                    borderRadius: '8px',
                    cursor:       'pointer',
                    position:     'relative',
                    color:        active ? CLONE_TOKENS.accent : CLONE_TOKENS.text2,
                    fontFamily:   '"Instrument Sans", sans-serif',
                    fontWeight:   active ? 600 : 500,
                    fontSize:     '0.875rem',
                    transition:   'color 0.15s ease, background 0.15s ease',
                    '&:hover': {
                      color:           CLONE_TOKENS.text,
                      backgroundColor: CLONE_TOKENS.bg,
                    },
                    '&::after': active
                      ? {
                          content:         '""',
                          position:        'absolute',
                          bottom:          -2,
                          left:            '50%',
                          transform:       'translateX(-50%)',
                          width:           '60%',
                          height:          2,
                          borderRadius:    1,
                          backgroundColor: CLONE_TOKENS.accent,
                        }
                      : {},
                  }}
                >
                  {label}
                </Box>
              </Box>
            );
          })}
        </Stack>
      )}

      {/* ── RIGHT: Guest buttons OR authenticated avatar ────── */}
      <Stack direction="row" spacing={{ xs: 0.75, sm: 1.5 }} alignItems="center">
        {isHomePage && (
          <>
            <ButtonBase
              onClick={openLanguageMenu}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.65,
                px: { xs: 0.8, sm: 1.1 },
                py: 0.6,
                borderRadius: '999px',
                border: `1px solid ${CLONE_TOKENS.border}`,
                backgroundColor: CLONE_TOKENS.white,
                color: CLONE_TOKENS.text2,
                fontSize: '0.82rem',
                fontWeight: 500,
                '&:hover': { backgroundColor: CLONE_TOKENS.bg },
              }}
            >
              <LanguageOutlinedIcon sx={{ fontSize: '0.95rem' }} />
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 600 }}>
                {selectedLanguage.code}
              </Typography>
              <Typography sx={{ fontSize: '0.6rem', color: CLONE_TOKENS.text3 }}>▾</Typography>
            </ButtonBase>

            <Menu
              anchorEl={languageAnchorEl}
              open={languageMenuOpen}
              onClose={closeLanguageMenu}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 0,
                sx: {
                  mt: 0.75,
                  width: 132,
                  maxHeight: 380,
                  borderRadius: '16px',
                  border: `1px solid ${CLONE_TOKENS.border}`,
                  boxShadow: '0 12px 36px rgba(28,26,22,0.12)',
                  overflow: 'auto',
                },
              }}
            >
              <Box sx={{ px: 1.2, pt: 1, pb: 0.6 }}>
                <Typography
                  sx={{
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: CLONE_TOKENS.text3,
                  }}
                >
                  {copy.navbar.appLanguage}
                </Typography>
              </Box>
              {LANGUAGE_OPTIONS.map((option) => {
                const isSelected = option.code === selectedLanguageCode;

                return (
                  <MenuItem
                    key={option.code}
                    onClick={() => handleLanguageSelect(option.code)}
                    sx={{
                      px: 1.2,
                      py: 0.8,
                      minHeight: 0,
                      backgroundColor: isSelected ? CLONE_TOKENS.accentLight : 'transparent',
                      '&:hover': { backgroundColor: CLONE_TOKENS.bg },
                    }}
                  >
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <Typography sx={{ fontSize: '0.62rem', color: CLONE_TOKENS.text3, minWidth: 22 }}>
                        {option.code}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.78rem',
                          fontWeight: isSelected ? 700 : 500,
                          color: CLONE_TOKENS.text2,
                        }}
                      >
                        {option.nativeLabel}
                      </Typography>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        )}

        {isAuthenticated ? (
          // ── Authenticated: avatar button ─────────────────────
          <>
            <Avatar
              onClick={openMenu}
              sx={{
                width:           34,
                height:          34,
                fontSize:        '0.8rem',
                fontWeight:      700,
                background:      `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
                color:           '#fff',
                cursor:          'pointer',
                border:          `2px solid ${CLONE_TOKENS.border}`,
                transition:      'box-shadow 0.15s ease',
                '&:hover': {
                  boxShadow: `0 0 0 3px ${CLONE_TOKENS.accentLight}`,
                },
              }}
            >
              {avatarInitial}
            </Avatar>

            {/* Dropdown menu */}
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={closeMenu}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 0,
                sx: {
                  mt:           0.75,
                  minWidth:     200,
                  borderRadius: '12px',
                  border:       `1px solid ${CLONE_TOKENS.border}`,
                  boxShadow:    '0 8px 32px rgba(28,26,22,0.12)',
                  overflow:     'visible',
                  // Arrow pointing up
                  '&::before': {
                    content:    '""',
                    display:    'block',
                    position:   'absolute',
                    top:        -6,
                    right:      14,
                    width:      12,
                    height:     12,
                    backgroundColor: CLONE_TOKENS.white,
                    border:     `1px solid ${CLONE_TOKENS.border}`,
                    transform:  'rotate(45deg)',
                    borderBottom: 'none',
                    borderRight:  'none',
                  },
                },
              }}
            >
              {/* User identity header */}
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography
                  sx={{
                    fontSize:  '0.82rem',
                    fontWeight: 700,
                    color:     CLONE_TOKENS.text,
                    lineHeight: 1.3,
                  }}
                >
                  {displayName}
                </Typography>
                {displayEmail && (
                  <Typography
                    sx={{
                      fontSize:  '0.72rem',
                      color:     CLONE_TOKENS.text3,
                      lineHeight: 1.3,
                      mt:        '2px',
                    }}
                  >
                    {displayEmail}
                  </Typography>
                )}
              </Box>

              <Divider sx={{ borderColor: CLONE_TOKENS.border }} />

              {/* Profile */}
              <MenuItem
                onClick={closeMenu}
                sx={{
                  px:         2,
                  py:         1,
                  fontSize:   '0.82rem',
                  color:      CLONE_TOKENS.text2,
                  '&:hover':  { backgroundColor: CLONE_TOKENS.bg, color: CLONE_TOKENS.text },
                }}
              >
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <PersonOutlineIcon sx={{ fontSize: '1rem', color: CLONE_TOKENS.text3 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  primaryTypographyProps={{ fontSize: '0.82rem', fontWeight: 500 }}
                />
              </MenuItem>

              {/* Logout */}
              <MenuItem
                onClick={handleLogout}
                sx={{
                  px:         2,
                  py:         1,
                  fontSize:   '0.82rem',
                  color:      CLONE_TOKENS.text2,
                  '&:hover':  { backgroundColor: '#FDF1EB', color: CLONE_TOKENS.accent },
                  '&:hover .MuiListItemIcon-root svg': { color: CLONE_TOKENS.accent },
                }}
              >
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <LogoutIcon sx={{ fontSize: '1rem', color: CLONE_TOKENS.text3 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ fontSize: '0.82rem', fontWeight: 500 }}
                />
              </MenuItem>
            </Menu>
          </>
        ) : (
          // ── Guest: sign in + try it buttons ──────────────────
          <>
            {!isMobile && (
              <Button
                component={NextLink}
                href="/signin"
                variant="text"
                sx={{
                  color:        CLONE_TOKENS.text2,
                  fontWeight:   500,
                  fontSize:     '0.875rem',
                  px:           1.5,
                  borderRadius: '2rem',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: CLONE_TOKENS.bg,
                    color:           CLONE_TOKENS.text,
                  },
                }}
              >
                {copy.navbar.signIn}
              </Button>
            )}
            <Button
              component={NextLink}
              href="/signup"
              variant="contained"
              sx={{
                minWidth:      0,
                background:    `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
                color:         '#fff',
                fontWeight:    600,
                fontSize:      { xs: '0.8rem', sm: '0.875rem' },
                px:            { xs: 1.15, sm: 1.75 },
                py:            0.7,
                borderRadius:  '2rem',
                textTransform: 'none',
                '&:hover': {
                  background: `linear-gradient(135deg, ${CLONE_TOKENS.accentDark} 0%, #8A3D10 100%)`,
                },
              }}
            >
              {isMobile ? 'Start' : copy.navbar.tryIt}
            </Button>
          </>
        )}

        {isMobile && (
          <IconButton
            onClick={() => setMobileNavOpen(true)}
            sx={{
              width: 34,
              height: 34,
              border: `1px solid ${CLONE_TOKENS.border}`,
              borderRadius: '10px',
              color: CLONE_TOKENS.text2,
            }}
          >
            <MenuIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        )}
      </Stack>

      <Drawer
        anchor="right"
        open={mobileNavOpen}
        onClose={closeMobileNav}
        PaperProps={{
          sx: {
            width: 280,
            p: 2,
            backgroundColor: CLONE_TOKENS.white,
          },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: CLONE_TOKENS.text }}>
            Menu
          </Typography>
          <IconButton onClick={closeMobileNav}>
            <CloseIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Stack>
        <Stack spacing={0.75}>
          {navItems.map(({ label, href }) => (
            <Box
              key={href}
              component={NextLink}
              href={href}
              onClick={closeMobileNav}
              sx={{
                px: 1.1,
                py: 0.9,
                borderRadius: '10px',
                textDecoration: 'none',
                color: CLONE_TOKENS.text2,
                backgroundColor: router.pathname === href ? CLONE_TOKENS.accentLight : CLONE_TOKENS.white,
                border: `1px solid ${CLONE_TOKENS.border}`,
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              {label}
            </Box>
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
}
