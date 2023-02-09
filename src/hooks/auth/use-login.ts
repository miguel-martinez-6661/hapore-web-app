import { useCallback } from "react";
import { LoginParams } from "@/types/api-auth-request";
import { signIn } from "next-auth/react";

const initialFormValues = {
  email: "",
  password: "",
};

export const useLogin = () => {
  const handleSubmitForm = useCallback(async (values: LoginParams) => {
    try {
      await signIn("credentials", { ...values });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return {
    initialFormValues,
    handleSubmitForm,
  };
};
