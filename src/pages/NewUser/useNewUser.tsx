import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useState } from "react";
import { RegistrationService } from "~/services/registration";
import {
  validateCPF,
  validateEmail,
  validateFullName,
} from "~/utils/validators";
import { ModalStateProps } from "~/components/Modal/types";

function useNewUser() {
  const history = useHistory();
  const [modal, setModal] = useState<ModalStateProps | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<object>({});
  const [errors, setErrors] = useState<object>({});

  const goToHome = (isNewUser: boolean = false) =>
    history.push(`${routes.dashboard}${isNewUser ? "?new-user" : ""}`);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let errorMsg = '';
    const validationRules = {
      name: () => validateFullName(value) ? '' : "Digite um Nome Completo válido.",
      email: () => validateEmail(value) ? '' : "Digite um Email válido.",
      cpf: () => validateCPF(value) ? '' : "Digite um CPF válido (apenas números).",
      admissionDate: () => value ? '' : "Digite uma Data de admissão válida.",
    };

    errorMsg = validationRules[name] ? validationRules[name]() : '';

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error)) {
      return;
    }

    setIsLoading(true);

    try {
      const { name, cpf, admissionDate, email} = formData;
      const spreadDate = admissionDate.split("-");

      await RegistrationService.create({
        admissionDate: `${spreadDate[2]}/${spreadDate[1]}/${spreadDate[0]}`,
        email,
        employeeName: name,
        status: "REVIEW",
        cpf: cpf.replace(/\D/g, ""),
      });

      goToHome(true);
    } catch (error) {
      setModal({
        title: "Ops!",
        content:
          "Erro ao cadastrar uma nova admissão.Por favor, revise as informações utilizadas e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    modal, 
    setModal, 
    goToHome, 
    formData,
    handleChange, 
    handleSubmit,
    errors
  }
};

export default useNewUser;
