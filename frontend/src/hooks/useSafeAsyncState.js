import {
  useCallback, useEffect, useRef, useState,
} from 'react';

export default function useSafeAsyncState(initialStatte) {
  const [state, setState] = useState(initialStatte);

  const isMounted = useRef();

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const setSafeAsyncState = useCallback((data) => {
    if (isMounted.current) {
      setState(data);
    }
  }, []);

  return [state, setSafeAsyncState];
}
