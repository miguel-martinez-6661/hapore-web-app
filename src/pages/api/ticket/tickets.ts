import type { NextApiRequest, NextApiResponse } from "next";
import { createTicketsForSale, fetchTickets } from "@/controllers";
import { getSession } from "next-auth/react";
import { validateSession } from "@/helpers/session-helper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": // List all tickets
      const { page } = req.query;
      try {
        validateSession(req);
        const { data, total } = await fetchTickets({ page: Number(page) });
        res.status(200).json({
          data,
          total,
        });
      } catch (error) {
        res.status(500).json({
          message: "Error: no se pudo obtener los tickets.",
        });
      }
      break;

    case "POST": // Create new tickets for a sale
      const session = await getSession({ req });
      const { name, dni, phoneNumber, ticketTypeId, quantity } = req.body;
      // @ts-ignore
      const userId = session?.user?.id;

      if (!userId) {
        res.status(401).json({
          message: "Error: usuario no autenticado.",
        });
        return;
      }

      try {
        await validateSession(req);
        const result = await createTicketsForSale({
          name,
          dni,
          phoneNumber,
          ticketTypeId,
          quantity,
          userId,
        });
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({
          message: "Error: no se pudo guardar el ticket.",
        });
      }
      break;

    case "PUT": // Update ticket status
      res.status(200).json({ name: "John Doe" });
      break;

    case "DELETE": // Invalidate ticket
      res.status(200).json({ name: "John Doe" });
      break;
  }
}
