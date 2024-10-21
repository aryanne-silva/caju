import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import Loader from "~/components/Loader";
import useNewUser from './useNewUser';
import Modal from '~/components/Modal';
import  InputMask from 'react-input-mask';

const NewUserPage = () => {
  const {
    isLoading,
    modal, 
    setModal, 
    goToHome, 
    formData,
    handleChange, 
    handleSubmit,
    errors
  } = useNewUser()

  return (
    <>
      {isLoading && <Loader />}
      {modal && (
        <Modal.Content title={modal?.title} onClose={() => setModal(null)}>
          <>{modal.content}</>
        </Modal.Content>
      )}
      <S.Container>
        <S.Card>
          <IconButton onClick={() => goToHome()} aria-label="back">
            <HiOutlineArrowLeft size={24} />
          </IconButton>
          
          <TextField
            name='name'
            placeholder="Ex: Maria José"
            label="Nome Completo"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <TextField
            name='email'
            placeholder="teste@gmail.com"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <label>CPF</label>
          <InputMask
            name='cpf'
            placeholder="999.999.999-99"
            mask="999.999.999-99"
            type="cpf"
            value={formData.cpf}
            onChange={handleChange}
            error={errors.cpf}
          >
            {(inputProps) => <S.Input {...inputProps} />}
          </InputMask>

          <TextField
            name='admissionDate'
            label="Data de admissão"
            type="date"
            value={formData.admissionDate}
            onChange={handleChange}
            error={errors.admissionDate}
          />
          <Button onClick={handleSubmit}>Cadastrar</Button>
        </S.Card>
      </S.Container>
    </>
  );
};

export default NewUserPage;
