import { HiRefresh } from "react-icons/hi";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import * as S from "./styles";
import { SearchBarProps } from "./types";
import useSearchBar from './useSearchBar';
import  InputMask from 'react-input-mask';
import Loader from '~/components/Loader';

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { 
    cpf, 
    handleRefresh, 
    goToNewAdmissionPage,
    handleInputChange,
    isLoading
  } = useSearchBar({onSearch});

  return (
    <>
     {(isLoading) && <Loader />}

      <S.Container>
        <S.Search>
          <InputMask
            name='cpf'
            placeholder="Digite um CPF válido"
            mask="999.999.999-99"
            type="cpf"
            value={cpf}
            onChange={handleInputChange}
          >
            {(inputProps) => <S.Input {...inputProps} />}
          </InputMask>
        </S.Search>
        
        <S.Actions>
          <IconButton aria-label="refetch">
            <HiRefresh onClick={handleRefresh} />
          </IconButton>
          <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
        </S.Actions>
      </S.Container>
    </>
  );
};
