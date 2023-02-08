import { Fade, Alert as MUIAlert } from "@mui/material";
import React from "react";

export enum AlertType {
  error = "error",
  success = "success",
  info = "info",
}

interface AlertProps {
  visible: boolean;
  type: AlertType;
  msg: string;
}

export const Alert = ({ visible, type, msg }: AlertProps) => {
  return (
    <div className="flex justify-center w-screen absolute bottom-16 z-10">
      <Fade in={visible}>
        <MUIAlert severity={type}>{msg}</MUIAlert>
      </Fade>
    </div>
  );
};
