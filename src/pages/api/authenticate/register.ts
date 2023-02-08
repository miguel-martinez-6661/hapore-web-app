import type { NextApiRequest, NextApiResponse } from "next";
import { registerUser } from "@/controllers/auth-controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await registerUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
