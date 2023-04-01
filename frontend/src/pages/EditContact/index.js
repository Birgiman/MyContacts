import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import useIsMounted from '../../hooks/useIsMounted';

export default function EditContact() {
  const [isLoading, setIsLoading] = useSafeAsyncState(true);
  const [contactName, setContactName] = useSafeAsyncState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const isMounted = useIsMounted();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(
          id,
        );

        if (isMounted()) {
          contactFormRef.current.setFieldsValues(contact);

          setIsLoading(false);
          setContactName(contact.name);
        }
      } catch {
        if (isMounted()) {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        }
      }
    }
    loadContact();
  }, [id, history, setIsLoading, setContactName, isMounted]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

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

  return (
    <>

      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>

  );
}
