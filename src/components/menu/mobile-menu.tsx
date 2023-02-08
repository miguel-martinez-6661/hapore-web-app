import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Slide } from "@mui/material";
import { RiDashboard2Line, RiQrScan2Line, RiTicket2Line } from "react-icons/ri";

interface MobileMenuProps {
  visible: boolean;
  onClose: () => void;
  onClickLogout: () => void;
}

export const MobileMenu = ({
  visible,
  onClose,
  onClickLogout,
}: MobileMenuProps) => {
  return (
    <Slide
      in={visible}
      className="flex -mt-5 w-screen absolute z-10 h-full bottom-0"
      direction="right"
      mountOnEnter
      unmountOnExit
    >
      <div className="flex w-full bg-orange-500">
        <div className="w-2/3 bg-gray-800 p-2 pl-5 h-full">
          <ul>
            <Image
              className="mb-5 p-4"
              src="/hapore-logo.png"
              width={300}
              height={200}
              alt="icon"
            />
            <li>
              <Link href="/" className="flex text-white" onClick={onClose}>
                <RiDashboard2Line size={24} className="mb-6 mr-2" />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link
                href="/tickets"
                className="flex text-white"
                onClick={onClose}
              >
                <RiTicket2Line size={24} className="mb-6 mr-2" />
                <span>Entradas</span>
              </Link>
            </li>
            <li>
              <Link
                href="/tickets/ticket-types"
                className="flex text-white"
                onClick={onClose}
              >
                <RiTicket2Line size={24} className="mb-6 mr-2" />
                <span>Tipo de Entradas</span>
              </Link>
            </li>
            <li>
              <Link href="/scan" className="flex text-white" onClick={onClose}>
                <RiQrScan2Line size={24} className="mb-6 mr-2" />
                <span>Escaneo de QR</span>
              </Link>
            </li>
          </ul>
          <Button
            color="error"
            className="absolute bottom-10"
            onClick={onClickLogout}
          >
            <span>Cerrar Session</span>
          </Button>
        </div>
        <div className="w-1/3 p-2 h-full" onClick={onClose} />
      </div>
    </Slide>
  );
};
