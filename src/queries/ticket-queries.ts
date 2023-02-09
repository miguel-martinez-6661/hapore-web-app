import { FetchTicketsParams } from "@/types/api-tickets-request";
import axios from "axios";

export const fetchTickets = async ({ page }: FetchTicketsParams) => {
  return await axios.get(`/api/ticket/tickets?page=${page}`);
};

export const fetchTicketTypes = async () => {
  return await axios.get("/api/ticket/ticket-types");
};
