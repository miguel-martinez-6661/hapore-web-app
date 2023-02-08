import type { NextApiRequest, NextApiResponse } from "next";
import { CreateTicketTypeParams } from "@/types/api-tickets-request";
import { fetchTicketTypes, upsertTicketType } from "@/controllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const result = await fetchTicketTypes();
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({
          message: "Error: no se pudo obtener los tipos de tickets.",
        });
      }
      break;

    case "POST":
      try {
        const params = req.body as CreateTicketTypeParams;
        const result = await upsertTicketType(params);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({
          message: "Error: no se pudo guardar el nuevo tipo de ticket.",
        });
      }
      break;

    default:
      break;
  }
}
