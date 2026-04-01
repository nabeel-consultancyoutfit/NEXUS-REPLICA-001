
import { useState, useCallback } from 'react';

const useToggle = (
  init = false
): [boolean, () => void, (v: boolean) => void] => {
  const [val, set] = useState(init);
  const toggle = useCallback(() => set((p) => !p), []);
  return [val, toggle, set];
};

export default useToggle;
