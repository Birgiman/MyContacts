import { useRef } from 'react';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useNewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact, qtyOfContacts = 1000) {
    try {
      const promises = [];

      for (let i = 0; i < qtyOfContacts; i += 1) {
        promises.push(ContactsService.createContact(contact));
      }

      await Promise.all(promises);

      contactFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
        duration: 7000,
      });
    }
  }

  return {
    contactFormRef,
    handleSubmit,
  };
}
