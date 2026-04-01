import { format } from 'date-fns';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '@/config';

/**
 * Format date to MM/dd/yyyy format
 */
export const formatDate = (date: Date | null | undefined): string => {
  if (!date) return '-';
  try {
    return format(new Date(date), DATE_FORMAT);
  } catch {
    return '-';
  }
};

/**
 * Format date to MM/dd/yyyy HH:mm format
 */
export const formatDateTime = (date: Date | null | undefined): string => {
  if (!date) return '-';
  try {
    return format(new Date(date), DATE_TIME_FORMAT);
  } catch {
    return '-';
  }
};

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate string to max length with ellipsis
 */
export const truncate = (str: string, max = 50): string => {
  if (!str) return '';
  return str.length > max ? `${str.slice(0, max)}...` : str;
};

/**
 * Get initials from first and last name
 */
export const getInitials = (firstName: string, lastName: string): string => {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return `${first}${last}`;
};

/**
 * Format number as currency
 */
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  } catch {
    return `${amount}`;
  }
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (num: number): string => {
  try {
    return new Intl.NumberFormat('en-US').format(num);
  } catch {
    return `${num}`;
  }
};

/**
 * Remove empty values from object
 */
export const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== null && value !== undefined && value !== '',
    ),
  );
};

/**
 * Build query string from parameters object
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
};

/**
 * Get deterministic color from palette based on name
 */
export const getAvatarColor = (name: string): string => {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E2',
    '#F8B195',
    '#C471ED',
  ];

  if (!name) return colors[0];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};
