
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchRegistrations } from "~/hooks/useRegistration";
import { Registration, RegistrationStatus } from "~/types/registration";
import { RegistrationService } from "~/services/registration";
import { getColumnByStatus } from "~/utils/columns";
import routes from "~/router/routes";
import { ModalStateProps } from "~/components/Modal/types";
import { maskCPF } from "~/utils/mask";
import * as S from './styles';

function useDashboard() {
  const history = useHistory();
  const [modal, setModal] = useState<ModalStateProps | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data,
    isLoading: isRegistrationLoading,
    refetch,
    setFilter,
    isError,
  } = fetchRegistrations();

  const handleRefresh = async () => {
    setFilter({});
    await refetch();
  };

  const handleSearch = ({ cpf, valid }: any) => {
    if (cpf.length >= 11 && !valid) {
      setModal({
        title: "Ops! Não foi possível encontrar este CPF",
        content: (
          <span>
            O CPF{" "}
            <strong>{maskCPF(cpf)}</strong> não é válido ou não consta em nossa base.
            Digite um CPF válido ou cadastre uma {' '}
            <S.NewUserLink onClick={() => history.push(routes.newUser)}>Nova Admissão</S.NewUserLink>
          </span>
        ),
      });
      return;
    }

    if (cpf.length === 11 && valid) {
      setFilter({ cpf });
    }
  };

  const handleRegistrationDelete = (registration: Registration) => {
    setIsLoading(true);
    setModal({
      title: "Deseja excluir a admissão?",
      content:"Ao excluir este item a ação não poderá ser desfeita.",
      onConfirmCallback: async () => {
        setModal(null);
        try {
          await RegistrationService.remove(registration.id);
          await refetch();
          setModal({
            title: "Admissão excluida",
            content: "A admissão de foi removida com sucesso!",
          });
        } catch (error) {
          setModal({
            title: "Ops!",
            content: "Não foi possível excluir a admissão. Tente novamente mais tarde.",
          });
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  const handleRegistrationUpdate = (
    registration: Registration,
    status: RegistrationStatus
  ) => {
    setIsLoading(true);

    const currentStatus = getColumnByStatus(registration.status);
    const desiredStatus = getColumnByStatus(status);

    setModal({
      title: "Deseja atualizar o status dessa admissão?",
      content: (
        <span>
          O status da admissão será atualizado de{" "}
          <strong>{registration.employeeName}</strong> de{" "}
          <strong style={{ color: currentStatus?.color }}>
            {currentStatus?.title}
          </strong>{" "}
          para{" "}
          <strong style={{ color: desiredStatus?.color }}>
            {desiredStatus?.title}
          </strong>.
        </span>
      ),
      onConfirmCallback: async () => {
        setModal(null);
        try {
          await RegistrationService.updateStatus(registration, status);
          await refetch();

          setModal({
            title: "Admissão atualizada!",
            content: (
              <span>
                A admissão de {' '}
                <strong>{registration.employeeName}</strong> {' '}
                foi atualizada para {' '}
                <strong style={{ color: desiredStatus?.color }}>
                  {desiredStatus?.title}
                </strong>.
              </span>
            ),
          });
        } catch (error) {
          setModal({
            title: "Ops!",
            content: (
              <span>
                Não foi possível atualizar a admissão de
                <strong>{registration.employeeName}</strong>.
                Tente novamente mais tarde.
              </span>
            ),
          });
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  useEffect(() => {
    if (history.location.search.slice(1) === "new-user") {
      setModal({
        title: "Nova admissão criada!",
        content: "A admissão foi cadastrada com sucesso.",
      });
      history.replace({ search: "" });
    }
  }, [history]);

  useEffect(() => {
    if (
      isLoading === false &&
      isRegistrationLoading === false &&
      !data?.length
    ) {
      setModal({
        title: "Nenhuma admissão encontrada!",
        content: (
          <span>
            Nenhuma admissão cadastrada. Cadastre uma {' '}
            <S.NewUserLink onClick={() => history.push(routes.newUser)}>Nova Admissão</S.NewUserLink>
          </span>
        ),
      });
    }
  }, [isLoading, isRegistrationLoading, data]);

  useEffect(() => {
    if (isError) {
      setModal({
        title: "Ops!",
        content: "Não foi possível consultar as admissões devido à um erro no servidor. Tente novamente mais tarde.",
      });
    }
  }, [isError]);


  return {
    isLoading, 
    isRegistrationLoading, 
    modal, 
    setModal, 
    data, 
    handleRefresh, 
    handleSearch,
    handleRegistrationDelete, 
    handleRegistrationUpdate,
    setIsLoading
  }
}

export default useDashboard;