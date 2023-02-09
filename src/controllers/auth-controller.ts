import bcrypt from "bcryptjs";
import prisma from "prisma/context";
import { RegisterParams } from "@/types/api-auth-request";

export const registerUser = async (payload: RegisterParams) => {
  try {
    const { name, email, password, applyCommission } = payload;
    const encryptedPassword = await bcrypt.hash(password, 10);

    if (!(email && password && name)) {
      throw new Error("Todos los campos son requeridos");
    }

    const userIfExist = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (userIfExist) {
      throw new Error("El usuario ya existe. Por favor inicia sesión");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        applyCommission: applyCommission || false,
        active: true,
      },
    });

    return user;
  } catch (err: any) {
    console.error(err);
    throw new Error(`No se pudo crear el usuario. ${err.message}`);
  }
};
