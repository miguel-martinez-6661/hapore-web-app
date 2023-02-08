import { useContext } from "react";
import { AlertContext } from "@/components/alerts/alert-provider";

export const useAlertContext = () => {
  return useContext(AlertContext);
};
