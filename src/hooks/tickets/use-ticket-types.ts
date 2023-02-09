import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useAlertContext } from "@/components/alerts/use-alert-context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TicketMutation, TicketQuery } from "@/constants/query-names";
import { CreateTicketTypeParams } from "@/types/api-tickets-request";
import { AlertType } from "@/components/alerts/alert";
import { createTicketType } from "@/mutations";
import { fetchTicketTypes } from "@/queries";

const TABLE_COL = [
  "Tipo de Entrada",
  "Descripcion",
  "Precio Bruto",
  "Precio Neto",
  "Activo",
];

export const useTicketTypes = () => {
  const router = useRouter();
  const { show } = useAlertContext();

  const { data: apiTicketTypes } = useQuery({
    queryKey: [TicketQuery.FETCH_TICKET_TYPES],
    queryFn: fetchTicketTypes,
  });

  const { mutate, isLoading, status } = useMutation({
    mutationKey: [TicketMutation.CREATE_TICKET_TYPE],
    mutationFn: createTicketType,
  });

  const data = useMemo(() => {
    return apiTicketTypes?.data?.map?.((type: any) => [
      type.name,
      type.description,
      `Gs. ${type.grossPrice}`,
      `Gs. ${type.netPrice}`,
      type.active ? "Si" : "No",
    ]);
  }, [apiTicketTypes]);

  const handleSubmitForm = (values: CreateTicketTypeParams) => {
    mutate(values);
  };

  useEffect(() => {
    if (status === "success") {
      show?.(AlertType.success, "Guardado con exito");
      setTimeout(() => {
        router.push("/tickets/ticket-types");
      }, 500);
    }
    if (status === "error") {
      show?.(AlertType.error, "Error al guardar");
    }
  }, [status, router, show]);

  return {
    apiTicketTypes,
    data,
    columns: TABLE_COL,
    handleSubmitForm,
    isLoading: isLoading,
    handleRowClick: () => {},
  };
};
