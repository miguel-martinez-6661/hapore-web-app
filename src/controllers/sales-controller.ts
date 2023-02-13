import prisma from "prisma/context";

export const getRevenueStats = async (from: Date, to: Date) => {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        User: true,
        Tickets: {
          include: {
            TicketType: true,
          },
        },
      },
      where: {
        createdAt: {
          gte: from,
          lte: to,
        },
      },
    });

    const grossTotal = sales.reduce((acc, sale) => {
      return acc + sale.total;
    }, 0);

    const netTotal = sales.reduce((acc, sale) => {
      if (sale.User.applyCommission) {
        return acc + sale.netTotal;
      } else {
        return acc + sale.total;
      }
    }, 0);

    const commissionsTotal = sales
      .filter((sale) => sale.User.applyCommission)
      .reduce((acc, sale) => sale.netTotal, 0);

    return {
      grossTotal,
      netTotal,
      commissionsTotal,
    };
  } catch (error) {
    console.error("API FETCH REVENUE STATS", error);
    throw error;
  }

  return {};
};
