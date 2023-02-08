import { Ticket } from "@prisma/client";

export interface FetchTicketsParams {
  page: number;
}
export interface FetchTicketsResponse {
  data: Ticket[];
  total: number;
}

export interface CreateTicketsForSaleParams {
  name: string;
  dni: string;
  phoneNumber: string;
  ticketTypeId: number;
  quantity: number;
}

export interface CreateTicketTypeParams {
  id: number;
  name: string;
  description: string;
  price: number;
  commission: number;
  active: boolean;
}

export interface CreateTicketSaleParams {
  dni: string;
  name: string;
  phoneNumber: string;
  ticketTypeId: number;
  quantity: number;
}
