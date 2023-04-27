/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import useHome from './useHome';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import {
  Container,
} from './styles';

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import SideBar from '../../components/SideBar';

export default function Home() {
  const {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleTryAgain,
    filteredContacts,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleDeleteConfirmContact,
    handleToggleOrderByCategory,
    selectedCategory,
    setCategories,
    isLoadingCategories,
    categories,
    handleToggleSideBar,
    isSideBarVisible,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>

      <SideBar
        onToggleCloseSideBar={handleToggleSideBar}
        visible={isSideBarVisible}
      />

      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}

      {hasContacts && (
      <>

        <ContactsList
          filteredContacts={filteredContacts}
          orderBy={orderBy}
          onToggleOrderBy={handleToggleOrderBy}
          onToggleOrderByCategory={handleToggleOrderByCategory}
          selectedCategory={selectedCategory}
          onDeleteContact={handleDeleteContact}
          setCategories={setCategories}
          isLoadingCategories={isLoadingCategories}
          categories={categories}
        />

        {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

        <Modal
          danger
          isLoading={isLoadingDelete}
          visible={isDeleteModalVisible}
          title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
          confirmLabel="Deletar"
          onCancel={handleCloseDeleteModal}
          onConfirm={handleDeleteConfirmContact}
        >
          <p>Esta ação não poderá ser desfeita!</p>
        </Modal>

      </>
      )}

    </Container>
  );
}
