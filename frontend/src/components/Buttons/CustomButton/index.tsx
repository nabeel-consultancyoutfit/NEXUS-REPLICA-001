
import React from 'react';
import { Button, CircularProgress, SxProps, Theme } from '@mui/material';

export interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
  size?: 'small' | 'medium' | 'large';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  sx?: SxProps<Theme>;
}

export default function CustomButton({
  label,
  onClick,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  startIcon,
  endIcon,
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  sx,
}: CustomButtonProps) {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={loading ? <CircularProgress size={18} color="inherit" /> : startIcon}
      endIcon={endIcon}
      sx={sx}
    >
      {label}
    </Button>
  );
}
