import { useState } from "react";
import { format, startOfMonth } from "date-fns";
import {
  RiMoneyDollarCircleLine,
  RiTicket2Line,
  RiWhatsappLine,
} from "react-icons/ri";
import { HiOutlineTicket } from "react-icons/hi";
import Page from "@/components/page";
import { TextField } from "@mui/material";

const INITIAL_FILTERS = {
  from: startOfMonth(new Date()),
  to: new Date(),
};

const Home = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  return (
    <Page>
      <div className="container p-5">
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
            />
            <TextField
              id="date"
              label="Hasta"
              type="date"
              className="w-1/2 lg:w-1/4"
              defaultValue={format(filters.to, "yyyy-MM-dd")}
            />
          </div>
          <div className="py-5 rounded-lg grid grid-rows-2 md:grid-rows-1 lg:grid-rows-1 grid-flow-col gap-4 mx-5 mt-2 md:my-10">
            <div className="bg-blue-200 rounded-xl p-4 drop-shadow-lg">
              <div className="flex items-center mb-5">
                <RiMoneyDollarCircleLine
                  size={42}
                  className="bg-blue-500 rounded-full p-1 mr-2"
                  color="white"
                />
                <p className="text-xl text-blue">Ganancia Bruta</p>
              </div>
              <p className="text-3xl">Gs. 25.100.000</p>
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
              <p className="text-3xl">Gs. 35.000.000</p>
            </div>
          </div>
          <div className="py-5 rounded-lg grid grid-rows-3 md:grid-rows-2 lg:grid-rows-1 grid-flow-col gap-4 mx-5 mt-2 md:my-10">
            <div className="bg-purple-300 rounded-xl p-4 drop-shadow-lg">
              <div className="flex items-center mb-5">
                <HiOutlineTicket
                  size={42}
                  className="bg-purple-500 rounded-full p-1 mr-2"
                  color="white"
                />
                <p className="text-xl text-purple-">Entradas Vendidas</p>
              </div>
              <p className="text-3xl">100</p>
            </div>
            <div className="bg-red-300  rounded-xl p-4 drop-shadow-lg">
              <div className="flex items-center mb-5">
                <RiTicket2Line
                  size={42}
                  className="bg-red-500 rounded-full p-1 mr-2"
                  color="white"
                />
                <p className="text-xl text-red-">Entradas Anuladas</p>
              </div>
              <p className="text-3xl">3</p>
            </div>
            <div className="bg-orange-300  rounded-xl p-4 drop-shadow-lg">
              <div className="flex items-center mb-5">
                <RiWhatsappLine
                  size={42}
                  className="bg-orange-500 rounded-full p-1 mr-2"
                  color="white"
                />
                <p className="text-xl text-orange-">Envios Pendientes</p>
              </div>
              <p className="text-3xl">0</p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
export default Home;
