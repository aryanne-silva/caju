import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

export const NewUserLink = styled.button`
  background: inherit;
  font-size: inherit;
  border: beige;
  font-weight: bold;
  color: blue;
  padding: 0;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
