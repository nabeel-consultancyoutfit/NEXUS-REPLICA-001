
import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Tooltip,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  NotificationsOutlined,
  LogoutOutlined,
} from '@mui/icons-material';
import { useAuthContext } from '@/contexts/AuthContext';

const APP_NAME = 'AAC Boilerplate';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuthContext();

  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const userInitials = user ? getInitials(user.firstName, user.lastName) : '';

  return (
    <AppBar position="fixed" sx={{ zIndex: 1200 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Menu Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuToggle}
          >
            <MenuIcon />
          </IconButton>
          {/* Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 600 }}
          >
            {APP_NAME}
          </Typography>
        </Box>

        {/* Right: Notifications, Avatar, Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Notifications */}
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsOutlined />
            </Badge>
          </IconButton>

          {/* User Avatar */}
          <Avatar
            sx={{
              width: 36,
              height: 36,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            {userInitials}
          </Avatar>

          {/* Logout Button */}
          <Tooltip title="Logout">
            <IconButton
              color="inherit"
              onClick={logout}
              aria-label="logout"
            >
              <LogoutOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
