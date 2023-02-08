import { useCallback, useEffect, useState } from "react";
import { login as doLogin, logout as doLogout } from "@/mutations";
import { LoginParams } from "@/types/api-auth-request";
import { HttpClient } from "@/network/httpClient";
import { User } from "@prisma/client";
import { AuthContext } from "./auth-context";
import { useRouter } from "next/router";
import { useAuthContext } from "./use-auth-context";

interface IAuthProvider {
  children: React.ReactNode;
}

interface StorageUser extends User {
  token: string;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const { replace } = useRouter();
  const [user, setUser] = useState<StorageUser | null>(null);

  const login = useCallback(async (payload: LoginParams) => {
    const { data: apiUser } = await doLogin(payload);
    HttpClient.setToken(apiUser.token);
    setUser(apiUser);
    localStorage.setItem("user", JSON.stringify(apiUser));
  }, []);

  const logout = useCallback(async () => {
    await doLogout();
    HttpClient.removeToken();
    localStorage.removeItem("user");
    setUser(null);
    replace("/auth/login");
  }, [replace]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
