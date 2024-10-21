import { HiOutlineX } from "react-icons/hi";
import { ContentProps, FooterProps } from "./types";
import { ButtonSmall } from "../Buttons";
import {
  Body,
  Container,
  FooterActions,
  FooterContainer,
  Header,
} from "./styles";
import { BackgroundContainer } from "../SharedStyles";

const Content = (props: ContentProps) => {
  const { title, children, onClose } = props

  return (
    <BackgroundContainer onClick={onClose}>
      <Container onClick={(event: Event) => event.stopPropagation()}>
        <Header>
          <h4>{title}</h4>
          <HiOutlineX className="close" onClick={onClose} />
        </Header>
        <Body>{children}</Body>
      </Container>
    </BackgroundContainer>
  );
};

const Footer = (props: FooterProps) => {
  const {
    message,
    onCancelCallback,
    onCancelText,
    onConfirmCallback,
    onConfirmText
  } = props

  return (
    <FooterContainer>
      <span>{message}</span>
      <FooterActions>
        {onCancelText && onConfirmCallback && (
          <ButtonSmall
            bgcolor="rgb(255, 145, 154)"
            onClick={onCancelCallback}
          >
            {onCancelText}
          </ButtonSmall>
        )}
        {onConfirmText && onConfirmCallback && (
          <ButtonSmall
            bgcolor="rgb(155, 229, 155)"
            onClick={onConfirmCallback}
          >
            {onConfirmText}
          </ButtonSmall>
        )}
      </FooterActions>
    </FooterContainer>
  );
};

export const Modal = {
  Content,
  Footer,
};

export default Modal;
