import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { TicketMutation } from "@/constants/query-names";
import { useAlertContext } from "@/components/alerts/use-alert-context";
import { useMutation } from "@tanstack/react-query";
import { AlertType } from "@/components/alerts/alert";
import { CreateTicketSaleParams } from "@/types/api-tickets-request";
import { createTicketsSale } from "@/mutations";
import { useTicketTypes } from "./use-ticket-types";

const INITIAL_FORM_VALUES = {
  dni: "",
  name: "",
  phoneNumber: "",
  ticketTypeId: -1,
  quantity: 1,
};

export const useSellTickets = () => {
  const router = useRouter();
  const { show } = useAlertContext();
  const { apiTicketTypes } = useTicketTypes();
  const {
    mutate,
    isLoading: isSaveLoading,
    status,
  } = useMutation([TicketMutation.SELL_TICKETS], createTicketsSale);

  const selectTicketTypes = useMemo(() => {
    return (
      apiTicketTypes?.data
        ?.filter((type: any) => type.active)
        ?.map((type: any) => ({
          label: type.name,
          value: type.id,
        })) || []
    );
  }, [apiTicketTypes]);

  const handleSubmitForm = useCallback(
    (values: CreateTicketSaleParams) => {
      mutate(values);
    },
    [mutate]
  );

  useEffect(() => {
    if (status === "success") {
      show?.(AlertType.success, "Guardado con exito");
      router.push("/tickets/sold-tickets");
    }
    if (status === "error") {
      show?.(AlertType.error, "Error al guardar");
    }
  }, [status, router, show]);

  return {
    isSaveLoading,
    initialFormValues: INITIAL_FORM_VALUES,
    selectTicketTypes,
    handleSubmitForm,
  };
};
