import React from "react";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import Page from "@/components/page";
import { useSellTickets } from "@/hooks/tickets/use-sell-tickets";
import { InputSelect } from "@/components/input-select/input-select";

const SellTickets = () => {
  const {
    isSaveLoading,
    initialFormValues,
    selectTicketTypes,
    handleSubmitForm,
  } = useSellTickets();

  return (
    <Page>
      <div className="container mt-10">
        <h1 className="text-4xl font-bold m-5 text-gray-800">
          Venta de Entradas
        </h1>

        <Formik initialValues={initialFormValues} onSubmit={handleSubmitForm}>
          {({ values, handleSubmit, handleChange }) => {
            return (
              <form
                className="flex flex-col mt-10 p-5 gap-5"
                onSubmit={handleSubmit}
              >
                <TextField
                  name="dni"
                  label="Numero Cedula"
                  variant="outlined"
                  type="number"
                  placeholder="Ej: 4.633.552"
                  value={values.dni}
                  onChange={handleChange}
                  required
                />
                <TextField
                  name="name"
                  label="Nombre y Apellido"
                  variant="outlined"
                  placeholder="Ej: Juan Perez"
                  value={values.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  name="phoneNumber"
                  label="Numero de Telefono"
                  variant="outlined"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  placeholder="Ej: (994)123456"
                  inputProps={{ maxLength: 9 }}
                  required
                />
                <InputSelect
                  name="ticketTypeId"
                  label="Tipo de Entrada"
                  options={selectTicketTypes}
                  value={`${values.ticketTypeId}`}
                  onChange={handleChange}
                  required
                />
                <TextField
                  name="quantity"
                  label="Cantidad de Entradas"
                  variant="outlined"
                  value={values.quantity}
                  onChange={handleChange}
                  type="number"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white drop-shadow-md p-2 rounded disabled:opacity-75"
                  disabled={
                    isSaveLoading ||
                    !values.dni ||
                    !values.name ||
                    !values.phoneNumber ||
                    !values.ticketTypeId ||
                    !values.quantity
                  }
                >
                  Confirmar
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </Page>
  );
};

export default SellTickets;
