import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function func() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(func, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
