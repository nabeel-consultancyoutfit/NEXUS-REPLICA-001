
import React from 'react';
import { useRouter } from 'next/router';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import {
  DashboardOutlined,
  StorageOutlined,
  CloudOutlined,
  TableChart as TableChartOutlined,
  BarChartOutlined,
  ArticleOutlined,
  SettingsOutlined,
} from '@mui/icons-material';

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: <DashboardOutlined /> },
  { title: 'Redux Demo', path: '/dashboard#redux', icon: <StorageOutlined /> },
  { title: 'RTK Query Demo', path: '/dashboard#rtk', icon: <CloudOutlined /> },
  { title: 'Table Demo', path: '/dashboard#table', icon: <TableChartOutlined /> },
  { title: 'Chart Demo', path: '/dashboard#chart', icon: <BarChartOutlined /> },
  { title: 'Form Demo', path: '/dashboard#form', icon: <ArticleOutlined /> },
  { title: 'Settings', path: '/settings', icon: <SettingsOutlined /> },
];

const DRAWER_WIDTH = 240;

interface NavLinksProps {
  open: boolean;
  onClose: () => void;
}

export default function NavLinks({ open, onClose }: NavLinksProps) {
  const router = useRouter();
  const { pathname } = router;

  const handleNavClick = (path: string) => {
    router.push(path);
    onClose();
  };

  const isActive = (path: string): boolean => {
    if (path.includes('#')) {
      return pathname === path.split('#')[0];
    }
    return pathname === path || pathname.startsWith(path);
  };

  const drawerContent = (
    <Box sx={{ width: DRAWER_WIDTH, pt: 2 }}>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.title}
            onClick={() => handleNavClick(item.path)}
            selected={isActive(item.path)}
            sx={{
              px: 2,
              py: 1,
              mb: 0.5,
              borderRadius: 1,
              mx: 1,
              '&.Mui-selected': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selected',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        transition: (theme) =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : 0,
          overflowX: 'hidden',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          mt: '64px', // AppBar height
          boxSizing: 'border-box',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
