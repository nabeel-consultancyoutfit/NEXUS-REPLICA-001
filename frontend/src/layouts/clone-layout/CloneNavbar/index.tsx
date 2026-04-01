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
import React, { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Stack,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon        from '@mui/icons-material/Logout';
import { CLONE_TOKENS }  from '@/theme/clone-theme';
import { useAuthContext } from '@/contexts/AuthContext';

// ─── Nav items ────────────────────────────────────────────────────────────────

interface NavItem { label: string; href: string }

const NAV_ITEMS: NavItem[] = [
  { label: 'Chat Hub',     href: '/ai/chat'        },
  { label: 'Marketplace',  href: '/ai/marketplace' },
  { label: 'Agents',       href: '/ai/agents'      },
  { label: 'Discover New', href: '/ai/discover'    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CloneNavbar() {
  const router                     = useRouter();
  const { user, isAuthenticated, logout } = useAuthContext();

  // Dropdown anchor for authenticated avatar menu
  const [anchorEl, setAnchorEl]    = useState<HTMLElement | null>(null);
  const menuOpen                   = Boolean(anchorEl);

  const openMenu  = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

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
        px:                   '2rem',
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
              fontSize:      '1rem',
              color:         CLONE_TOKENS.text,
              letterSpacing: '-0.01em',
            }}
          >
            NexusAI
          </Typography>
        </Stack>
      </Box>

      {/* ── CENTER: Nav links ───────────────────────────────── */}
      <Stack direction="row" spacing={0.5} alignItems="center">
        {NAV_ITEMS.map(({ label, href }) => {
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

      {/* ── RIGHT: Guest buttons OR authenticated avatar ────── */}
      <Stack direction="row" spacing={1.5} alignItems="center">
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
              Sign in
            </Button>
            <Button
              component={NextLink}
              href="/signup"
              variant="contained"
              sx={{
                background:    `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
                color:         '#fff',
                fontWeight:    600,
                fontSize:      '0.875rem',
                px:            1.75,
                py:            0.7,
                borderRadius:  '2rem',
                textTransform: 'none',
                '&:hover': {
                  background: `linear-gradient(135deg, ${CLONE_TOKENS.accentDark} 0%, #8A3D10 100%)`,
                },
              }}
            >
              Try It →
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}
