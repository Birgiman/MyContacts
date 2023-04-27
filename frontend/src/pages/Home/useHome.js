/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import {
  useEffect, useState, useCallback, useMemo, useDeferredValue,
} from 'react';

import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';
import CategoriesService from '../../services/CategoriesService';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const deferredSeacrhTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(() => {
    setIsLoading(true);

    const filteredByName = contacts.filter((contact) => (
      contact.name.toLowerCase().includes(deferredSeacrhTerm.toLowerCase())
    ));

    const filteredByCategory = selectedCategory === 'all'
      ? filteredByName
      : selectedCategory === 'empty'
        ? filteredByName.filter((contact) => !contact.category.id)
        : filteredByName.filter((contact) => contact.category.id === selectedCategory);

    setIsLoading(false);

    return filteredByCategory;
  }, [contacts, deferredSeacrhTerm, selectedCategory]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories(controller.signal);

        setCategories(categoriesList);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();

    return () => {
      controller.abort();
    };
  }, [setCategories, setIsLoadingCategories]);

  const loadContacts = useCallback(async (signal) => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy, signal);

      setHasError(false);

      setContacts(contactsList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  const handleToggleOrderByCategory = useCallback((event) => {
    const selectedValue = event.target.value;

    if (selectedValue === selectedCategory) {
      return;
    }

    setSelectedCategory(selectedValue);
  }, [selectedCategory]);

  function handleChangeSearchTerm(event) {
    setIsLoading(true);
    setSearchTerm(event.target.value);
  }

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }, []);

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  function handleToggleSideBar() {
    console.log('Clicou');
    setIsSideBarVisible(!isSideBarVisible);
  }

  async function handleDeleteConfirmContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleDeleteConfirmContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleTryAgain,
    filteredContacts,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
    handleToggleOrderByCategory,
    isLoadingCategories,
    selectedCategory,
    categories,
    handleToggleSideBar,
    isSideBarVisible,
  };
}
