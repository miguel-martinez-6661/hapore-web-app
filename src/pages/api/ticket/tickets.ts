import type { NextApiRequest, NextApiResponse } from "next";
import { createTicketsForSale, fetchTickets } from "@/controllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": // List all tickets
      const { page } = req.query;
      try {
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
      const { name, dni, phoneNumber, ticketTypeId, quantity } = req.body;

      try {
        const result = await createTicketsForSale({
          name,
          dni,
          phoneNumber,
          ticketTypeId,
          quantity,
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
