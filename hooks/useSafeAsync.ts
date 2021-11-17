import { useCallback } from 'react';
import { useMountedState } from './useMountedState';

export const useSafeAsync = () => {
  const isMounted = useMountedState();
  const safeAsync = useCallback(
    (promise) => {
      return new Promise((resolve) => {
        promise.then((value: any) => {
          if (isMounted()) {
            resolve(value);
          }
        });
      });
    },
    [isMounted]
  );

  return safeAsync;
};
