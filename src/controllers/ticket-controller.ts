import { PrismaClient } from "@prisma/client";
import {
  FetchTicketsParams,
  FetchTicketsResponse,
} from "@/types/api-tickets-request";

const prisma = new PrismaClient();

export const fetchTickets = async ({
  page,
}: FetchTicketsParams): Promise<FetchTicketsResponse> => {
  try {
    const tickets = await prisma.ticket.findMany({
      skip: page * 10,
      take: 10,
    });
    return {
      data: tickets,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
