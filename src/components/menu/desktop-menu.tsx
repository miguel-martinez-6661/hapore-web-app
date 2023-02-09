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
    <div className="invisible lg:visible flex flex-col p-3 h-0 lg:h-screen bg-gray-900">
      <ul>
        <Image
          className="mb-5 p-5"
          src="/hapore-logo.png"
          width={500}
          height={200}
          alt="hapore-logo"
        />

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
            <span>Escaneo de QR</span>
          </Link>
        </li>
        <li>
          <Button color="error" onClick={onClickLogout}>
            <HiLogout size={24} className="mx-2" />
            <span>Cerrar Sesion</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};
