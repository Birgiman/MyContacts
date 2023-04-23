import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { memo } from 'react';

import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';

import { ListHeader, Card } from './styles';
import Select from '../../../../components/Select';

function ContactsList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
  onToggleOrderByCategory,
  categories,
  selectedCategory,
  isLoadingCategories,
}) {
  return (
    <>

      <ListHeader
        orderBy={orderBy}
        filteredContacts={filteredContacts}
      >
        <button
          type="button"
          onClick={onToggleOrderBy}
          disabled={filteredContacts.length === 0}
        >
          <span>Nome</span>
          <img src={arrow} alt="Arrow" />
        </button>

        <Select
          value={selectedCategory}
          onChange={onToggleOrderByCategory}
          disabled={isLoadingCategories}
        >
          <option value="all">Todas as categorias</option>
          <option value="empty">Sem categoria</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </Select>

      </ListHeader>

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category.name && (
                <small>{contact.category.name}</small>
              )}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button" onClick={() => onDeleteContact(contact)}>
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}

    </>
  );
}

ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onToggleOrderByCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  isLoadingCategories: PropTypes.bool.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default memo(ContactsList);
