import nextAuth, { AuthOptions } from "next-auth";
import { loginUser } from "@/controllers/auth-controller";
import Credential from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    Credential({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "guido@hapore.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "********",
        },
      },
      // @ts-ignore
      async authorize(credentials) {
        try {
          const user = await loginUser({
            email: credentials!.email,
            password: credentials!.password,
          });

          return user;
        } catch (error) {
          console.error(error);
          throw new Error("No se ha podido autenticar.");
        }
      },
    }),
  ],
  jwt: {},
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.user.token;
      session.user = {
        ...session.user,
        // @ts-ignore
        id: token.user.id,
      };
      return session;
    },
  },
};

export default nextAuth(authOptions);
