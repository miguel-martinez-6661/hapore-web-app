import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "prisma/context";
import { LoginParams, RegisterParams } from "@/types/api-auth-request";

const { SECRET_API_KEY } = process.env;

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

export const loginUser = async (payload: LoginParams) => {
  try {
    const { email, password } = payload;

    if (!(email && password)) {
      throw new Error("Email y contraseña requeridos");
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (
      !!user &&
      (await bcrypt.compare(password, user.password)) &&
      SECRET_API_KEY
    ) {
      // Create token
      const token = jwt.sign({ user_id: user.id, email }, SECRET_API_KEY, {
        expiresIn: "2h",
      });

      return {
        ...user,
        token,
      };
    } else {
      throw new Error("Email o contraseña incorrectos");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const validateToken = async (token: string) => {
  try {
    if (SECRET_API_KEY) {
      const decoded = jwt.verify(token, SECRET_API_KEY);
      const user = await prisma.user.findUnique({
        where: {
          email: (decoded as any).email,
        },
      });

      return !!user;
    } else {
      throw new Error("No se pudo validar el token");
    }
  } catch (err) {
    console.error("API VALIDATE TOKEN ERROR", err);
    throw err;
  }
};
