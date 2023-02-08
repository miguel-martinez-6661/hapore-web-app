import { CreateTicketTypeParams } from "@/types/api-tickets-request";
import { TicketType } from "@prisma/client";
import prisma from "prisma/context";

export const fetchTicketTypes = async (): Promise<TicketType[]> => {
  try {
    const result = await prisma.ticketType.findMany({});
    return result;
  } catch (error) {
    console.error("API FETCH TICKET TYPES", error);
    throw error;
  }
};

export const upsertTicketType = async (
  payload: CreateTicketTypeParams
): Promise<TicketType> => {
  try {
    const { id, name, description, commission, price, active } = payload;

    let result;
    if (!id) {
      result = await prisma.ticketType.create({
        data: {
          name,
          description,
          commission,
          grossPrice: price,
          netPrice: price - (price * commission) / 100,
          active,
        },
      });
    } else {
      result = await prisma.ticketType.update({
        where: {
          id,
        },
        data: {
          description,
          commission,
          grossPrice: price,
          netPrice: price - (price * commission) / 100,
          active,
        },
      });
    }

    if (id) {
      const salesWithSameTicketType = await prisma.sale.findMany({
        include: {
          Tickets: true,
        },
        where: {
          Tickets: {
            some: {
              ticketTypeId: id,
            },
          },
        },
      });

      for (const sale of salesWithSameTicketType) {
        const totalPerTicket = price - (price * commission) / 100;
        const ticketsCount = sale.Tickets.length;
        const total = totalPerTicket * ticketsCount;
        await prisma.sale.update({
          where: {
            id: sale.id,
          },
          data: {
            total,
          },
        });
      }
    }

    return result;
  } catch (error) {
    console.error("API CREATE TICKET TYPE", error);
    throw error;
  }
};
