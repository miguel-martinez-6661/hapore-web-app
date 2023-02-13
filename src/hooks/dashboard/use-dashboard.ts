import {
  InvitationsQuery,
  SalesQuery,
  TicketQuery,
} from "@/constants/query-names";
import {
  fetchInvitationStats,
  fetchRevenueStats,
  fetchTicketsStats,
} from "@/queries";
import { useQuery } from "@tanstack/react-query";
import { startOfMonth } from "date-fns";
import { useState } from "react";

const INITIAL_FILTERS = {
  from: startOfMonth(new Date()),
  to: new Date(),
};

export const useDashboard = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const { data: invitationStats, isLoading: invitationStatsLoading } = useQuery(
    [InvitationsQuery.FETCH_INVITATIONS_STATS, filters.from, filters.to],
    () => fetchInvitationStats(filters.from, filters.to)
  );

  const { data: revenueStats, isLoading: revenueStatsLoading } = useQuery(
    [SalesQuery.FETCH_SALE_STATS, filters.from, filters.to],
    () => fetchRevenueStats(filters.from, filters.to)
  );

  const { data: ticketsStats, isLoading: ticketsStatsLoading } = useQuery(
    [TicketQuery.FETCH_TICKET_STATS, filters.from, filters.to],
    () => fetchTicketsStats(filters.from, filters.to)
  );

  const onChangeFilters = ([key, value]: [string, any]) => {
    const newValue = new Date(value);
    setFilters((prev) => ({ ...prev, [key]: newValue }));
  };

  return {
    filters,
    onChangeFilters,
    isLoading:
      invitationStatsLoading || revenueStatsLoading || ticketsStatsLoading,
    invitations: invitationStats?.data,
    revenueStats: revenueStats?.data,
    ticketsStats: ticketsStats?.data,
  };
};
