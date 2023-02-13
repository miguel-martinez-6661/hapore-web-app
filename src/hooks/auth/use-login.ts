import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { LoginParams } from "@/types/api-auth-request";
import { useAlertContext } from "@/components/alerts/use-alert-context";
import { AlertType } from "@/components/alerts/alert";

const initialFormValues = {
  email: "",
  password: "",
};

export const useLogin = () => {
  const { show } = useAlertContext();
  const handleSubmitForm = useCallback(
    async (values: LoginParams) => {
      signIn("credentials", { ...values }).catch((err) => {
        console.error(err);
        show?.(AlertType.error, "No se ha podido iniciar sesión");
      });
    },
    [show]
  );

  return {
    initialFormValues,
    handleSubmitForm,
  };
};
