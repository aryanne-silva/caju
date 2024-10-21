import styled from "styled-components";

export const Content = styled.div`
  padding: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;

  @keyframes spin {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  .spin {
    max-width: 130px;
    max-height: 130px;
    display: inline-block;
    animation: spin 1s linear infinite; /* 2 segundos por rotação, animação linear e infinita */
  }
`;
