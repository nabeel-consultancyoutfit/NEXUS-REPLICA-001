
import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Header from '@/layout/Header';
import NavLinks from '@/layout/NavLinks';

export interface MainLayoutProps {
  children: React.ReactNode;
}

const DRAWER_WIDTH = 240;
const HEADER_HEIGHT = 64;

export default function MainLayout({ children }: MainLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Reset sidebar on breakpoint change
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleMenuToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleSidebarClose = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Header */}
      <Header onMenuToggle={handleMenuToggle} />

      {/* Sidebar Navigation */}
      <NavLinks open={sidebarOpen} onClose={handleSidebarClose} />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          mt: `${HEADER_HEIGHT}px`,
          ml: sidebarOpen && !isMobile ? `${DRAWER_WIDTH}px` : 0,
          transition: (theme) =>
            theme.transitions.create('margin-left', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
