import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    return res.status(200).json({});
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}
