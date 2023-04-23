import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  margin-top: 32px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
  padding-bottom: 16px;
`;

export const ContactsContainer = styled.div`
  display: block;
  align-items: center;
  justify-content: center;


    .all-contacts {

    font-size: 24px;
    }
    .filtered-contacts {

      font-size: 12px;
    display: flex;
    color: ${({ theme }) => theme.colors.gray[500]};
    }


  span {
    font-size: 12px;
    display: flex;
    color: ${({ theme }) => theme.colors.gray[500]};
  }
`;
export const LinkContainer = styled.div`
  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: #fff;
    }

  }
`;
