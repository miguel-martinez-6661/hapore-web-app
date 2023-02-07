import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { HiLogout } from "react-icons/hi";
import { RiDashboard2Line, RiQrScan2Line, RiTicket2Line } from "react-icons/ri";

interface DesktopMenuProps {
  onClickLogout: () => void;
}

export const DesktopMenu = ({ onClickLogout }: DesktopMenuProps) => {
  return (
    <div className="invisible lg:visible flex flex-col p-3 h-0 lg:h-screen bg-gradient-to-r from-gray-900 to-gray-700">
      <ul>
        <Image
          className="mb-5"
          src="/hapore-logo.png"
          width={800}
          height={400}
          alt="hapore-logo"
        />
        <h3 className="mb-2 text-xs uppercase text-gray-500 font-medium">
          Menu
        </h3>

        <li>
          <Link
            href="/"
            className="flex items-center pl-3 py-3 pr-4 text-gray-50 rounded hover:text-indigo-500"
          >
            <RiDashboard2Line size={24} className="mr-2" />
            <span>Inicio</span>
          </Link>
        </li>

        <li>
          <Link
            href="/tickets/sold-tickets"
            className="flex items-center pl-3 py-3 pr-4 text-gray-50 rounded hover:text-indigo-500"
          >
            <RiTicket2Line size={24} className="mr-2" />
            <span>Entradas Vendidas</span>
          </Link>
        </li>
        <li>
          <Link
            href="/tickets/ticket-types"
            className="flex items-center pl-3 py-3 pr-4 text-gray-50 rounded hover:text-indigo-500"
          >
            <RiTicket2Line size={24} className="mr-2" />
            <span>Tipos de Entrada</span>
          </Link>
        </li>

        <li>
          <Link
            href="/scan"
            className="flex items-center pl-3 py-3 pr-4 text-gray-50 rounded hover:text-indigo-500"
          >
            <RiQrScan2Line size={24} className="mr-2" />
            <span>Escaneo</span>
          </Link>
        </li>
        <li>
          <Button color="error" onClick={onClickLogout}>
            <HiLogout size={24} className="mx-2" />
            <span>Salir</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};
