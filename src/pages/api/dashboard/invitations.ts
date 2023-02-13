import type { NextApiRequest, NextApiResponse } from "next";
import { validateSession } from "@/helpers/session-helper";
// import { getInvitationsStats } from "@/controllers/invitations-controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await validateSession(req);
    // const messageStats = await getInvitationsStats();
    res.status(200).json({});
  } catch (error: any) {
    res.status(500).json({
      message: `Error: ${error.message}`,
    });
  }
}
