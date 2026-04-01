
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  SxProps,
  Theme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  actions?: React.ReactNode;
  showCloseButton?: boolean;
  sx?: SxProps<Theme>;
}

export default function CommonDialog({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = true,
  actions,
  showCloseButton = true,
  sx,
}: CommonDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      sx={sx}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 600,
        }}
      >
        {title}
        {showCloseButton && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: 'text.secondary',
              ml: 'auto',
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        {children}
      </DialogContent>

      {actions && <DialogActions sx={{ p: 2 }}>{actions}</DialogActions>}
    </Dialog>
  );
}
