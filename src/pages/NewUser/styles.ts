import styled from "styled-components";
import { _IconButtonStyled } from "~/components/Buttons/IconButton";
import Button from "~/components/Buttons";

export const Input = styled.input`
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 1rem;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;
  :focus {
    outline: none;
    border: 1px solid #007c89;
    box-shadow: inset 0 0 0 1px #007c89;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  padding-top: 32px;
`;

export const Card = styled.div`
  border: 2px solid #f0f0f0;
  width: 500px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
 
  ${_IconButtonStyled} {
    margin-bottom: 8px;
    align-items: flex-start;
  }

  ${Button}{
    align-self: flex-end;
  }
`;