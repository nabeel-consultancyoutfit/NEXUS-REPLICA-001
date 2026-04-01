
import { useMediaQuery, useTheme } from '@mui/material';
import { Breakpoint } from '@mui/material/styles';

type QueryType = 'up' | 'down' | 'between';

/**
 * Hook to check responsive breakpoints using Material-UI theme
 * @param query - Type of query: 'up', 'down', or 'between'
 * @param start - Starting breakpoint
 * @param end - Ending breakpoint (required for 'between' query)
 * @returns boolean indicating if the breakpoint query matches
 */
export const useResponsive = (
  query: QueryType,
  start: Breakpoint,
  end?: Breakpoint
): boolean => {
  const theme = useTheme();

  const matches = useMediaQuery(() => {
    switch (query) {
      case 'up':
        return theme.breakpoints.up(start);
      case 'down':
        return theme.breakpoints.down(start);
      case 'between':
        if (!end) {
          console.warn('useResponsive: "between" query requires an end breakpoint');
          return false;
        }
        return theme.breakpoints.between(start, end);
      default:
        return false;
    }
  });

  return matches;
};

export default useResponsive;
