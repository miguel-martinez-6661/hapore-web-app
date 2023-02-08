import type { NextApiRequest, NextApiResponse } from "next";
import { loginUser } from "@/controllers/auth-controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await loginUser(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}
