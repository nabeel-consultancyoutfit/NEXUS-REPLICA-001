
import React from 'react';
import { SnackbarProvider, useSnackbar, SnackbarKey } from 'notistack';
import type { VariantType } from 'notistack';

export let snackbarRef: React.RefObject<any>;

/**
 * Component to configure and expose snackbar utilities
 * Should be wrapped inside SnackbarProvider
 */
export const SnackbarUtilsConfigurator: React.FC = () => {
  snackbarRef = useSnackbar();
  return null;
};

/**
 * Show success message
 */
export const showSuccess = (message: string): SnackbarKey | undefined => {
  return snackbarRef?.enqueueSnackbar?.(message, { variant: 'success' });
};

/**
 * Show error message
 */
export const showError = (message: string): SnackbarKey | undefined => {
  return snackbarRef?.enqueueSnackbar?.(message, { variant: 'error' });
};

/**
 * Show warning message
 */
export const showWarning = (message: string): SnackbarKey | undefined => {
  return snackbarRef?.enqueueSnackbar?.(message, { variant: 'warning' });
};

/**
 * Show info message
 */
export const showInfo = (message: string): SnackbarKey | undefined => {
  return snackbarRef?.enqueueSnackbar?.(message, { variant: 'info' });
};

export { SnackbarProvider };
