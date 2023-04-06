class ContactMapper {
  toPersistence(domainContact) {
    return {
      id: domainContact.id,
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.categoryId,
    };
  }

  toDomain(perdistenceContact) {
    return {
      id: perdistenceContact.id,
      name: perdistenceContact.name,
      email: perdistenceContact.email,
      phone: perdistenceContact.phone,
      category: {
        id: perdistenceContact.category_id,
        name: perdistenceContact.category_name,
      },
    };
  }
}

export default new ContactMapper();
