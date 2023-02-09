import React from "react";
import Link from "next/link";
import { HiPlus, HiTrash } from "react-icons/hi";
import MUIDataTable from "mui-datatables";
import Page from "@/components/page";
import { useSoldTickets } from "./hooks/use-sold-tickets";
import { LoadingScreen } from "@/components/loading-screen";

const Tickets = () => {
  const {
    isLoading,
    data,
    columns,
    page,
    totalData,
    selectedRow,
    handlePageChange,
    handleRowClick,
  } = useSoldTickets();

  return (
    <Page>
      <LoadingScreen visible={isLoading} />

      <div>
        <h1 className="text-4xl font-bold m-5 text-gray-800">
          Entradas Vendidas
        </h1>
        <div className="flex px-5 mt-10 gap-4">
          <Link href="/tickets/sell-tickets">
            <button className="flex items-center bg-green-600 text-white drop-shadow-md p-2 rounded">
              <HiPlus color="white" className="mr-2" />
              Nueva Venta
            </button>
          </Link>
          {selectedRow && (
            <>
              <button className="flex items-center bg-red-600 text-white drop-shadow-md p-2 rounded">
                <HiTrash color="white" className="mr-2" />
                Eliminar
              </button>
            </>
          )}
        </div>

        <div className="w-full mt-5 p-5">
          <MUIDataTable
            title=""
            columns={columns}
            data={data}
            options={{
              responsive: "standard",
              count: totalData,
              pagination: true,
              onChangePage: handlePageChange,
              selectableRowsHideCheckboxes: true,
              onRowSelectionChange: handleRowClick,
              serverSide: true,
              page,
            }}
          />
        </div>
      </div>
    </Page>
  );
};

export default Tickets;
