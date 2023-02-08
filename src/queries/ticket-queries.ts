import httpClient from "@/network/httpClient";
import { FetchTicketsParams } from "@/types/api-tickets-request";

export const fetchTickets = async ({ page }: FetchTicketsParams) => {
  return await httpClient.get(`/ticket/tickets?page=${page}`);
};

export const fetchTicketTypes = async () => {
  return await httpClient.get("/ticket/ticket-types");
};
