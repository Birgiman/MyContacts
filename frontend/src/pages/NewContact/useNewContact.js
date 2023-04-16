import { useRef } from 'react';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useNewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
      await ContactsService.createContact(contact);

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

  // async function handleMultipleSubmit(contact) {
  //   try {
  //     const promises = [];

  //     for (let i = 0; i < 1000; i += 1) {
  //       const promise = handleSubmit(contact);
  //       promises.push(promise);
  //     }

  //     await Promise.all(promises);
  //   } catch {
  //     toast({
  //       type: 'danger',
  //       text: 'Ocorreu um erro ao cadastrar os contatos!',
  //       duration: 7000,
  //     });
  //   } finally {
  //     toast({
  //       type: 'success',
  //       text: 'Todos os contatos foram cadastrados com sucesso!',
  //       duration: 5000,
  //     });
  //   }
  // }

  return {
    contactFormRef,
    handleSubmit,
    // handleMultipleSubmit,
  };
}
