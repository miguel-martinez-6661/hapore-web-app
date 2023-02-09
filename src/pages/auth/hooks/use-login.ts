import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { LoginParams } from "@/types/api-auth-request";
import { signIn } from "next-auth/react";
import { useAuthContext } from "@/providers/auth-provider/use-auth-context";

const initialFormValues = {
  email: "",
  password: "",
};

export const useLogin = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  const handleSubmitForm = useCallback(async (values: LoginParams) => {
    try {
      await signIn("credentials", { ...values });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [router, isLoggedIn]);

  return {
    initialFormValues,
    handleSubmitForm,
  };
};
