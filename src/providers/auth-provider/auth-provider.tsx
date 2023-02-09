import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { AuthContext } from "./auth-context";

interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const { data, status } = useSession();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      setSession(data);
    } else {
      setSession(null);
    }
  }, [status, data]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: status === "authenticated",
        user: session?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
