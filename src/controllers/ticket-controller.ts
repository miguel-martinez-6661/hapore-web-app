import { Sale } from "@prisma/client";
import prisma from "prisma/context";
import {
  CreateTicketsForSaleParams,
  FetchTicketsParams,
  FetchTicketsResponse,
} from "@/types/api-tickets-request";
import {
  base64ToFileUrl,
  generateQR,
  getTemplate,
  sendMessage,
} from "@/helpers";
import { MEDIA_FOLDER } from "@/constants/storage";
import { EXAMPLE_MSG } from "@/constants/message-templates";

const PY_CODE = "+595";

export const fetchTicketStats = async (from: Date, to: Date) => {
  try {
    const result = await prisma.ticket.findMany({
      include: {
        Sale: {
          select: {
            createdAt: true,
          },
        },
      },
      where: {
        Sale: {
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      },
    });

    const total = result.length;
    const canceled = result.filter((ticket) => !ticket.active).length;
    const actives = result.filter((ticket) => ticket.active).length;

    return { total, actives, canceled };
  } catch (error) {
    console.error("API FETCH TICKETS STATS", error);
    throw error;
  }
};

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
            User: true,
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
  userId,
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
            id: userId,
          },
        },
        total: (ticketTypeUsed?.grossPrice || 0) * quantity,
        netTotal: (ticketTypeUsed?.netPrice || 0) * quantity,
      },
    });

    const ticketsCode: string[] = [];
    for (let i = 0; i < quantity; i++) {
      const aTicket = await prisma.ticket.create({
        data: {
          ticketTypeId,
          saleId: sale.id,
          active: true,
        },
      });

      const ticketQrCode = await generateQR(aTicket.ticketNumber);
      const result = base64ToFileUrl(
        {
          fileName: `${aTicket.ticketNumber}.png`,
          base64: ticketQrCode as string,
        },
        MEDIA_FOLDER.TICKET
      );

      ticketsCode.push(result);
    }

    sendMessage(
      `${PY_CODE}${phoneNumber}`,
      getTemplate(EXAMPLE_MSG, [100]),
      ticketsCode
    );

    return sale;
  } catch (error) {
    console.error("API CREATE TICKETS FOR SALE", error);
    throw error;
  }
};
