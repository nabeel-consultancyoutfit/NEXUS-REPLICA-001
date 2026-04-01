import {
  format,
  formatDistance,
  differenceInDays,
  isBefore,
  isValid,
} from 'date-fns';

/**
 * Format date using date-fns
 * @param date - Date to format
 * @param fmt - Format string (default: 'MM/dd/yyyy')
 * @returns Formatted date string or '-' if date is falsy
 */
export const formatDate = (
  date: Date | string | null | undefined,
  fmt = 'MM/dd/yyyy'
): string => {
  if (!date) return '-';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!isValid(dateObj)) return '-';
    return format(dateObj, fmt);
  } catch {
    return '-';
  }
};

/**
 * Format date with time
 * @param date - Date to format
 * @returns Formatted date-time string or '-' if date is falsy
 */
export const formatDateTime = (
  date: Date | string | null | undefined
): string => {
  if (!date) return '-';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!isValid(dateObj)) return '-';
    return format(dateObj, 'MM/dd/yyyy HH:mm:ss');
  } catch {
    return '-';
  }
};

/**
 * Format date relative to now (e.g., "2 hours ago")
 * @param date - Date to format
 * @returns Relative time string or '-' if date is falsy
 */
export const formatRelative = (
  date: Date | string | null | undefined
): string => {
  if (!date) return '-';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!isValid(dateObj)) return '-';
    return formatDistance(dateObj, new Date(), { addSuffix: true });
  } catch {
    return '-';
  }
};

/**
 * Get difference in days between two dates
 * @param d1 - First date
 * @param d2 - Second date
 * @returns Number of days difference
 */
export const getDaysDiff = (
  d1: Date | string | null | undefined,
  d2: Date | string | null | undefined
): number => {
  if (!d1 || !d2) return 0;

  try {
    const date1 = typeof d1 === 'string' ? new Date(d1) : d1;
    const date2 = typeof d2 === 'string' ? new Date(d2) : d2;

    if (!isValid(date1) || !isValid(date2)) return 0;
    return differenceInDays(date1, date2);
  } catch {
    return 0;
  }
};

/**
 * Check if a date is expired (before now)
 * @param date - Date to check
 * @returns true if date is before now
 */
export const isExpired = (
  date: Date | string | null | undefined
): boolean => {
  if (!date) return false;

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!isValid(dateObj)) return false;
    return isBefore(dateObj, new Date());
  } catch {
    return false;
  }
};

/**
 * Convert date to API format (ISO date: yyyy-MM-dd)
 * @param date - Date to convert
 * @returns Formatted date string or empty string if date is falsy
 */
export const toApiDate = (
  date: Date | string | null | undefined
): string => {
  if (!date) return '';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, 'yyyy-MM-dd');
  } catch {
    return '';
  }
};
