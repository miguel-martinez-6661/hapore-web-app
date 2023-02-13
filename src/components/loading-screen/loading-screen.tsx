import React from "react";
import { CircularProgress } from "@mui/material";

interface LoadingScreenProps {
  visible: boolean;
}

export const LoadingScreen = ({ visible }: LoadingScreenProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center absolute z-10 bg-black/50 top-0 left-0 w-full h-full ${
        visible ? "visible" : "invisible"
      }`}
    >
      <CircularProgress color="primary" size={100} />
      <h2 className="text-2xl text-gray-800 mt-2">Cargando</h2>
    </div>
  );
};
