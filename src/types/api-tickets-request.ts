import { Ticket } from "@prisma/client";

export interface FetchTicketsParams {
  page: number;
}

export interface FetchTicketsResponse {
  data: Ticket[];
}
