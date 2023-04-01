import {
  useCallback, useState,
} from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsyncState(initialStatte) {
  const [state, setState] = useState(initialStatte);

  const isMounted = useIsMounted();

  const setSafeAsyncState = useCallback((data) => {
    if (isMounted()) {
      setState(data);
    }
  }, [isMounted]);

  return [state, setSafeAsyncState];
}
