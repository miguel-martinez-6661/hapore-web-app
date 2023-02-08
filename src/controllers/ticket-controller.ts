import { Sale } from "@prisma/client";
import {
  CreateTicketsForSaleParams,
  FetchTicketsParams,
  FetchTicketsResponse,
} from "@/types/api-tickets-request";
import prisma from "prisma/context";

export const fetchTickets = async ({
  page,
}: FetchTicketsParams): Promise<FetchTicketsResponse> => {
  try {
    const total = await prisma.ticket.count();
    const data = await prisma.ticket.findMany({
      include: {
        Sale: {
          include: {
            Customer: true,
          },
        },
        TicketType: true,
      },
      orderBy: {
        Sale: {
          createdAt: "desc",
        },
      },
      skip: page * 10,
      take: 10,
    });

    return { data, total };
  } catch (error) {
    console.error("API FETCH TICKETS", error);
    throw error;
  }
};

export const createTicketsForSale = async ({
  name,
  dni,
  phoneNumber,
  ticketTypeId,
  quantity,
}: CreateTicketsForSaleParams): Promise<Sale> => {
  try {
    const customerDni = `${dni}`.trim();
    const ticketTypeUsed = await prisma.ticketType.findUnique({
      where: { id: ticketTypeId },
    });

    const customer = await prisma.customer.upsert({
      where: { dni: customerDni },
      update: {
        name: name,
        phone: phoneNumber,
      },
      create: {
        dni: customerDni,
        name: name,
        phone: phoneNumber,
      },
    });

    const sale = await prisma.sale.create({
      data: {
        Customer: {
          connect: {
            dni: customer.dni,
          },
        },
        User: {
          connect: {
            id: 1, // Replace by the real user id
          },
        },
        total: (ticketTypeUsed?.grossPrice || 0) * quantity,
        netTotal: (ticketTypeUsed?.netPrice || 0) * quantity,
      },
    });

    const ticketsToCreate = [];
    for (let i = 0; i < quantity; i++) {
      ticketsToCreate.push({
        ticketTypeId,
        active: true,
        saleId: sale.id,
      });
    }

    await prisma.ticket.createMany({
      data: ticketsToCreate,
    });

    return sale;
  } catch (error) {
    console.error("API CREATE TICKETS FOR SALE", error);
    throw error;
  }
};
