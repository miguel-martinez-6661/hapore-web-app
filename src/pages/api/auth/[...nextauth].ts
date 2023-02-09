import { loginUser } from "@/controllers/auth-controller";
import nextAuth, { AuthOptions } from "next-auth";
import Credential from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    Credential({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "juan@google.com" },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "********",
        },
      },
      // @ts-ignore
      async authorize(credentials) {
        return await loginUser({
          email: credentials!.email,
          password: credentials!.password,
        });
      },
    }),
  ],
  jwt: {},
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken;
      session.user = session.user;

      return session;
    },
  },
};

export default nextAuth(authOptions);
