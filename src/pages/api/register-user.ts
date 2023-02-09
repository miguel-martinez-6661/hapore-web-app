import type { NextApiRequest, NextApiResponse } from "next";
import { registerUser } from "@/controllers/auth-controller";
import { RegisterParams } from "@/types/api-auth-request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, name, password, applyCommission } =
      req.body as RegisterParams;
    const result = await registerUser({
      email,
      name,
      password,
      applyCommission,
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: `Error: no se pudo crear usuario. ${error.message}`,
    });
  }
}
