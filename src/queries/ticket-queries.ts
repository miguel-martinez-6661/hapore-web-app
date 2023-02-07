import httpClient from "@/network/httpClient";
import { FetchTicketsParams } from "@/types/api-tickets-request";

export const fetchTickets = ({ page }: FetchTicketsParams) => {
  return httpClient.get(`/tickets?page=${page}`);
};
