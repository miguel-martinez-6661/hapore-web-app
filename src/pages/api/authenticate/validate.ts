import { validateToken } from "@/controllers/auth-controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { authorization } = req.headers;
    const isValid = await validateToken(authorization as string);
    res.status(200).json({ validToken: isValid });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}
