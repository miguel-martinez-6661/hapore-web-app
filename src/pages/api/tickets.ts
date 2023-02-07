// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fetchTickets } from "@/queries/ticket-queries";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { page } = req.query;
      try {
        const { data } = await fetchTickets({ page });
        res.status(200).json(data);
      } catch (error) {
        throw error;
      }
      break;
    case "POST":
      res.status(200).json({ name: "John Doe" });
      break;
    case "PUT":
      res.status(200).json({ name: "John Doe" });
      break;
    case "DELETE":
      res.status(200).json({ name: "John Doe" });
      break;
    default:
      res.status(200).json({ name: "John Doe" });
  }
}
//   res.status(200).json({ name: 'John Doe' })
