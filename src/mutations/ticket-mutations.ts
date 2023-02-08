import httpClient from "@/network/httpClient";
import {
  CreateTicketSaleParams,
  CreateTicketTypeParams,
} from "@/types/api-tickets-request";

export const createTicketType = async (ticket: CreateTicketTypeParams) => {
  return httpClient.post("/ticket/ticket-types", ticket);
};

export const createTicketsSale = async (payload: CreateTicketSaleParams) => {
  return httpClient.post("/ticket/tickets", payload);
};
