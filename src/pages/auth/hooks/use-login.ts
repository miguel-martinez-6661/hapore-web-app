import { useEffect } from "react";
import { useRouter } from "next/router";
import { AlertType } from "@/components/alerts/alert";
import { useAuthContext } from "@/providers/auth-provider/use-auth-context";
import { useAlertContext } from "@/components/alerts/use-alert-context";
import { AuthMutation } from "@/constants/query-names";
import { LoginParams } from "@/types/api-auth-request";
import { useMutation } from "@tanstack/react-query";

const initialFormValues = {
  email: "",
  password: "",
};

export const useLogin = () => {
  const router = useRouter();
  const { user, login, isLoggedIn } = useAuthContext();
  const { show } = useAlertContext();
  const {
    mutate: doLogin,
    isLoading,
    status,
    error: apiError,
  } = useMutation([AuthMutation.LOGIN], login);

  const handleSubmitForm = (values: LoginParams) => {
    doLogin(values);
  };

  useEffect(() => {
    if (status === "success") {
      show?.(AlertType.success, `Bienvenido ${user?.name}`);
      router.push("/");
    }
    if (status === "error") {
      show?.(AlertType.error, `Error al iniciar sesion`);
    }
  }, [status, router, show, user?.name]);

  return {
    initialFormValues,
    handleSubmitForm,
    error: apiError?.response?.data,
    isLoading,
  };
};
