import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

export const validateSession = async (req: NextApiRequest) => {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!session) {
    throw new Error("Usuario no autenticado");
  }
};
