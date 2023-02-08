import { createContext } from "react";
import { User } from "@prisma/client";
import { LoginParams } from "@/types/api-auth-request";

interface IAuthContext {
  isLoggedIn: boolean;
  user: User | null;
  token?: string | null;
  login: (payload: LoginParams) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  user: null,
  token: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});
