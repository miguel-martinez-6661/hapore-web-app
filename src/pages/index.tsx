import { format } from "date-fns";
import {
  RiMoneyDollarCircleLine,
  RiTicket2Line,
  RiWhatsappLine,
} from "react-icons/ri";
import Page from "@/components/page";
import { TextField } from "@mui/material";
import { useDashboard } from "@/hooks/dashboard/use-dashboard";
import { LoadingScreen } from "@/components/loading-screen";

const Home = () => {
  const {
    filters,
    onChangeFilters,
    invitations,
    revenueStats,
    ticketsStats,
    isLoading,
  } = useDashboard();

  return (
    <>
      <LoadingScreen visible={isLoading} />
      <Page>
        <div>
          <div className="m-4">
            <h1 className="text-4xl font-bold m-5 text-gray-800 drop-shadow-lg">
              Inicio
            </h1>

            <div className="flex gap-4 m-4">
              <TextField
                id="date"
                label="Desde"
                type="date"
                className="w-1/2 lg:w-1/4"
                defaultValue={format(filters.from, "yyyy-MM-dd")}
                onChange={(e) => onChangeFilters(["from", e.target.value])}
              />
              <TextField
                id="date"
                label="Hasta"
                type="date"
                className="w-1/2 lg:w-1/4"
                defaultValue={format(filters.to, "yyyy-MM-dd")}
                onChange={(e) => onChangeFilters(["to", e.target.value])}
              />
            </div>
            {/* Ganancias */}
            <h2 className="text-2xl ml-5 py-6 sm:py-0 sm:pt-5">Ganancias</h2>
            <div className="rounded-lg grid grid-rows-3 md:grid-rows-2 lg:grid-rows-1 grid-flow-col gap-4 mx-5 mt-2 md:my-10">
              <div className="bg-blue-200 rounded-xl p-4 drop-shadow-lg">
                <div className="flex items-center mb-5">
                  <RiMoneyDollarCircleLine
                    size={42}
                    className="bg-blue-500 rounded-full p-1 mr-2"
                    color="white"
                  />
                  <p className="text-xl text-blue">Ganancia Bruta</p>
                </div>
                <p className="text-3xl">{`Gs. ${
                  revenueStats?.grossTotal || 0
                }`}</p>
              </div>
              <div className="bg-green-100 rounded-xl p-4 drop-shadow-lg">
                <div className="flex items-center mb-5">
                  <RiMoneyDollarCircleLine
                    size={42}
                    className="bg-green-500 rounded-full p-1 mr-2"
                    color="white"
                  />
                  <p className="text-xl text-green-">Ganancia Total</p>
                </div>
                <p className="text-3xl">{`Gs. ${
                  revenueStats?.netTotal || 0
                }`}</p>
              </div>
              <div className="bg-orange-100 rounded-xl p-4 drop-shadow-lg">
                <div className="flex items-center mb-5">
                  <RiMoneyDollarCircleLine
                    size={42}
                    className="bg-orange-500 rounded-full p-1 mr-2"
                    color="white"
                  />
                  <p className="text-xl text-green-">Comisiones Totales</p>
                </div>
                <p className="text-3xl">{`Gs. ${
                  revenueStats?.commissionsTotal || 0
                }`}</p>
              </div>
            </div>
            {/* Entradas */}
            <h2 className="text-2xl ml-5 py-6 sm:py-0">Entradas</h2>
            <div className="rounded-lg grid grid-rows-3 md:grid-rows-2 lg:grid-rows-1 grid-flow-col gap-4 mx-5 mt-2 md:my-10">
              <div className="bg-blue-200 rounded-xl p-4 drop-shadow-lg">
                <div className="flex items-center mb-5">
                  <RiTicket2Line
                    size={42}
                    className="bg-blue-500 rounded-full p-1 mr-2"
                    color="white"
                  />
                  <p className="text-xl text-blue">Entradas Vendidas</p>
                </div>
                <p className="text-3xl">{ticketsStats?.total || 0}</p>
              </div>
              <div className="bg-green-100 rounded-xl p-4 drop-shadow-lg">
                <div className="flex items-center mb-5">
                  <RiTicket2Line
                    size={42}
                    className="bg-green-500 rounded-full p-1 mr-2"
                    color="white"
                  />
                  <p className="text-xl text-green-">Entradas Activas</p>
                </div>
                <p className="text-3xl">{ticketsStats?.actives || 0}</p>
              </div>
              <div className="bg-purple-100 rounded-xl p-4 drop-shadow-lg">
                <div className="flex items-center mb-5">
                  <RiTicket2Line
                    size={42}
                    className="bg-purple-500 rounded-full p-1 mr-2"
                    color="white"
                  />
                  <p className="text-xl text-green-">Entradas Canceladas</p>
                </div>
                <p className="text-3xl">{ticketsStats?.canceled || 0}</p>
              </div>
            </div>
            {/* Invitaciones */}
            <h2 className="text-2xl ml-5 py-6 sm:py-0">Invitaciones</h2>
            <div className="rounded-lg grid grid-rows-3 md:grid-rows-2 lg:grid-rows-1 grid-flow-col gap-4 mx-5 mt-2 md:my-10">
              <div className="bg-blue-200 rounded-xl p-4 drop-shadow-lg">
                <div className="flex items-center mb-5">
                  <RiWhatsappLine
                    size={42}
                    className="bg-blue-500 rounded-full p-1 mr-2"
                    color="white"
                  />
                  <p className="text-xl text-blue">Invitaciones Enviadas</p>
                </div>
                <p className="text-3xl">{invitations?.total || 0}</p>
              </div>
              <div className="bg-green-100 rounded-xl p-4 drop-shadow-lg">
                <div className="flex items-center mb-5">
                  <RiWhatsappLine
                    size={42}
                    className="bg-green-500 rounded-full p-1 mr-2"
                    color="white"
                  />
                  <p className="text-xl text-green-">Invitaciones Entregadas</p>
                </div>
                <p className="text-3xl">{invitations?.delivered || 0}</p>
              </div>
              <div className="bg-red-100 rounded-xl p-4 drop-shadow-lg">
                <div className="flex items-center mb-5">
                  <RiWhatsappLine
                    size={42}
                    className="bg-red-500 rounded-full p-1 mr-2"
                    color="white"
                  />
                  <p className="text-xl text-green-">Invitaciones Pendientes</p>
                </div>
                <p className="text-3xl">{invitations?.undelivered || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};
export default Home;
