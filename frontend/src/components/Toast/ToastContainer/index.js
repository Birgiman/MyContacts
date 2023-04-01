import { useEffect, useCallback } from 'react';
import ToastMessage from '../ToastMessage';

import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';
import useSafeAsyncState from '../../../hooks/useSafeAsyncState';

export default function ToastContainer() {
  const [messages, setMessages] = useSafeAsyncState([]);

  useEffect(() => {
    function handleAddToast(payload) {
      const { type, text, duration } = payload;

      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);
  }, [setMessages]);

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id,
    ));
  }, [setMessages]);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
