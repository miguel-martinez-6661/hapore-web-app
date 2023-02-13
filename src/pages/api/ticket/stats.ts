import { fetchTicketStats } from "@/controllers";
import { validateSession } from "@/helpers/session-helper";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await validateSession(req);
    const { from, to } = req.query;
    const ticketStats = await fetchTicketStats(
      new Date(from as string),
      new Date(to as string)
    );
    res.status(200).json(ticketStats);
  } catch (error: any) {
    res.status(500).json({
      message: `No se pudo obtener el estado de tickets. ${error.message}`,
    });
  }
}
