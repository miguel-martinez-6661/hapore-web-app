import axios from "axios";
import {
  CreateTicketSaleParams,
  CreateTicketTypeParams,
} from "@/types/api-tickets-request";

export const createTicketType = async (ticket: CreateTicketTypeParams) => {
  return axios.post("/api/ticket/ticket-types", ticket);
};

export const createTicketsSale = async (payload: CreateTicketSaleParams) => {
  return axios.post("/api/ticket/tickets", payload);
};
