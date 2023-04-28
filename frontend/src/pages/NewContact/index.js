import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import SideBar from '../../components/SideBar';
import useNewContact from './useNewContact';

export default function NewContact() {
  const {
    contactFormRef,
    handleSubmit,
    // handleMultipleSubmit,
  } = useNewContact();

  return (
    <>

      <SideBar />

      <PageHeader
        title="Novo contato"
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>

  );
}
