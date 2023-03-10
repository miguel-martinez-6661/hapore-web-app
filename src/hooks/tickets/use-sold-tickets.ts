import { useMemo, useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { TicketQuery } from "@/constants/query-names";
import { fetchTickets } from "@/queries/ticket-queries";

const TABLE_COL = [
  "Tipo de Entrada",
  "Vendido a",
  "Precio",
  "Vendido por",
  "Fecha Venta",
  "Activo",
];

export const useSoldTickets = () => {
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState();

  const { data: apiTickets, isLoading } = useQuery(
    [TicketQuery.FETCH_TICKETS, page],
    () => fetchTickets({ page })
  );

  const data = useMemo(() => {
    return apiTickets?.data?.data?.map((ticket: any) => [
      // ticket.ticketNumber,
      ticket.TicketType.name,
      ticket.Sale.Customer.name,
      `Gs. ${
        ticket.applyComission
          ? ticket.TicketType.netPrice
          : ticket.TicketType.grossPrice
      }`,
      ticket.Sale.User.name,
      format(new Date(ticket.Sale.createdAt), "dd/MM/yyyy"),
      ticket.active ? "Si" : "No",
    ]);
  }, [apiTickets]);

  const handleRowClick = (selected: any) => {
    console.log({ selected });
    setSelectedRow(selected);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    isLoading,
    totalData: apiTickets?.data.total,
    page,
    data,
    columns: TABLE_COL,
    selectedRow,
    handleRowClick,
    handlePageChange,
  };
};
