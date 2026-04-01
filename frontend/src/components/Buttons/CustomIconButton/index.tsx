
import React from 'react';
import { IconButton, Tooltip, SxProps, Theme } from '@mui/material';

interface CustomIconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export default function CustomIconButton({
  children,
  onClick,
  tooltip,
  color = 'primary',
  size = 'medium',
  disabled = false,
  sx,
}: CustomIconButtonProps) {
  const button = (
    <IconButton
      onClick={onClick}
      color={color}
      size={size}
      disabled={disabled}
      sx={sx}
    >
      {children}
    </IconButton>
  );

  if (tooltip) {
    return <Tooltip title={tooltip}>{button}</Tooltip>;
  }

  return button;
}
