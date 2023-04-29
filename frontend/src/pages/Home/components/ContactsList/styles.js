import styled from 'styled-components';

export const ListHeader = styled.header`
  margin-top: 24px;
  margin-bottom: 8px;
  display: flex;

    button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;

    &[disabled] {
      cursor: default;
    }


    span {
      margin-right: 8px;
      font-weight: bold;
      color: ${({ filteredContacts, theme }) => (
    filteredContacts.length === 0 ? theme.colors.gray[200] : theme.colors.primary.main
  )};
    }

    img {
      filter: ${({ filteredContacts }) => (
    filteredContacts.length === 0 ? 'grayscale(100%)' : 'none'
  )};
      transform: ${({ orderBy }) => (orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')};
      transition: transform 0.2s ease-in;
    }
  }

  Select {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: none;
    font-weight: bold;
    font-size: 14px;
    height: 30px;
    max-width: 180px;
    padding: 0;
    margin-left: 16px;
    cursor: pointer;
  }
`;

export const Card = styled.div`
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }

  .info {
    .contact-name {
      display: flex;
      align-items: center;

      strong {
        color: ${({ theme }) => theme.colors.gray[900]};
      }

      small {
        background: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        padding: 4px;
        border-radius: 4px;
        margin-left: 8px;
      }
    }
    span {
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      background: transparent;
      border: none;
      margin-left: 8px;
    }

  }

`;
