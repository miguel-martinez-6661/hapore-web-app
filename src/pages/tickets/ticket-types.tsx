import React from "react";
import Link from "next/link";
import MUIDataTable from "mui-datatables";
import { HiPlus } from "react-icons/hi";
import Page from "@/components/page";
import { useTicketTypes } from "./hooks/use-ticket-types";

const TicketTypes = () => {
  const { data, columns } = useTicketTypes();

  return (
    <Page>
      <div className="container h-screen p-5">
        <h1 className="text-4xl font-bold text-gray-800">Tipos de Entrada</h1>
        <div className="mt-10">
          <Link href="/tickets/create-new-ticket-type">
            <button className="flex items-center bg-green-600 text-white drop-shadow-md p-2 rounded">
              <HiPlus color="white" className="mr-2" />
              Nuevo
            </button>
          </Link>
        </div>

        <div className="w-full mt-10">
          <MUIDataTable
            title={"Tipos de Entradas"}
            columns={columns}
            data={data}
            options={{
              responsive: "standard",
              selectableRowsHideCheckboxes: true,
            }}
          />
        </div>
      </div>
    </Page>
  );
};

export default TicketTypes;
