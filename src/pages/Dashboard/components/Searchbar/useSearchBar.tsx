
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useEffect, useRef, useState } from "react";
import { SearchBarProps } from "./types";
import { validateCPF } from "~/utils/validators";
import { maskCPF } from "~/utils/mask";

function useSearchBar({ onSearch }: SearchBarProps) {
  const cpfRef = useRef<HTMLInputElement>(null);
  const [cpf, setCPF] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleInputChange = ({ target }: { target: HTMLInputElement }) => {
    const maskedCPF = maskCPF(target.value);
    setCPF(maskedCPF);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setCPF("");

    if (cpfRef.current) {
      cpfRef.current.value = "";
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (cpf) {
      onSearch({ cpf: cpf.replace(/\D/g, ""), valid: validateCPF(cpf) });
    }
  }, [cpf]);

  return {
    cpfRef,
    handleInputChange,
    cpf,
    handleRefresh,
    goToNewAdmissionPage,
    isLoading
  };
}

export default useSearchBar;