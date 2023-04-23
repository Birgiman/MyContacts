/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ContactsContainer, Container, LinkContainer } from './styles';

export default function Header({ hasError, qtyOfContacts, qtyOfFilteredContacts }) {
  const alignment = hasError ? 'flex-end' : (qtyOfContacts > 0 ? 'space-between' : 'center');

  return (
    <Container
      justifyContent={alignment}
    >
      {(!hasError && qtyOfContacts > 0) && (
        <ContactsContainer>
          <strong className="all-contacts">
            {qtyOfContacts}
            {qtyOfContacts === 1 ? ' contato' : ' contatos'}
          </strong>
          {qtyOfContacts !== qtyOfFilteredContacts && (
            <strong className="filtered-contacts">
              {qtyOfFilteredContacts === 0 ? '' : qtyOfFilteredContacts}
              {qtyOfFilteredContacts === 0 ? ' Nada para filtrar!' : ' filtrados!'}
            </strong>
          )}
        </ContactsContainer>
      )}
      <LinkContainer>
        <Link to="/new">Novo contato</Link>
      </LinkContainer>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfContacts: PropTypes.number.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired,
};
