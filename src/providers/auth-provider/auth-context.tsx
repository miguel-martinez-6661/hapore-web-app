import { createContext } from "react";

interface IAuthContext {
  isLoggedIn: boolean;
  user: any;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  user: null,
});
