
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface UsePathReturn {
  pathname: string;
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  isActive: (path: string, exact?: boolean) => boolean;
}

/**
 * Custom hook for Next.js routing with convenience methods
 */
export const usePath = (): UsePathReturn => {
  const router = useRouter();
  const pathname = usePathname();

  const push = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const replace = useCallback(
    (path: string) => {
      router.replace(path);
    },
    [router]
  );

  const back = useCallback(() => {
    router.back();
  }, [router]);

  const isActive = useCallback(
    (path: string, exact = true): boolean => {
      if (exact) {
        return pathname === path;
      }
      // Prefix match: check if pathname starts with the given path
      return pathname.startsWith(path);
    },
    [pathname]
  );

  return {
    pathname,
    push,
    replace,
    back,
    isActive,
  };
};

export default usePath;
