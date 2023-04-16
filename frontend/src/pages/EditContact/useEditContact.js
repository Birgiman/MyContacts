import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useSafeAsyncState(true);
  const [contactName, setContactName] = useSafeAsyncState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();

    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(
          id,
          controller.signal,
        );

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);

          setIsLoading(false);
          setContactName(contact.name);
        });
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          safeAsyncAction(() => {
            navigate('/', { replace: true });
            toast({
              type: 'danger',
              text: 'Contato não encontrado!',
            });
          });
        }
      }
    }
    loadContact();

    return () => {
      controller.abort();
    };
  }, [id, navigate, setIsLoading, setContactName, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      await ContactsService.updateContact(id, contact);

      setContactName(contact.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
        duration: 7000,
      });
    }
  }

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
