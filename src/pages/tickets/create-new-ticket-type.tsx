import React from "react";
import { Formik } from "formik";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { useTicketTypes } from "@/hooks/tickets/use-ticket-types";
import Page from "@/components/page";

const initialFormValues = {
  id: 0,
  name: "",
  description: "",
  commission: 0,
  price: 0,
  active: true,
};

const CreateTicketType = () => {
  const { handleSubmitForm } = useTicketTypes();

  return (
    <Page>
      <div className="container mt-10">
        <h1 className="text-4xl font-bold m-5 text-gray-800">
          Crear Tipo de Entrada
        </h1>

        <Formik initialValues={initialFormValues} onSubmit={handleSubmitForm}>
          {({ values, handleSubmit, handleChange }) => (
            <form
              className="flex flex-col mt-10 p-5 gap-5"
              onSubmit={handleSubmit}
            >
              <TextField
                id="name"
                name="name"
                label="Nombre del Tipo de Entrada"
                value={values.name}
                onChange={handleChange}
                variant="outlined"
                required
              />
              <TextField
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                label="Descripcion"
                variant="outlined"
                required
              />
              <TextField
                id="commission"
                name="commission"
                value={values.commission}
                onChange={handleChange}
                label="Comision (%)"
                variant="outlined"
                type={"number"}
                required
              />
              <TextField
                id="price"
                name="price"
                value={values.price}
                onChange={handleChange}
                variant="outlined"
                label="Precio"
                type="number"
                required
              />
              <FormControlLabel
                control={
                  <Switch value={values.active} onChange={handleChange} />
                }
                label="Activa"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white drop-shadow-md p-2 rounded disabled:opacity-75"
              >
                Confirmar
              </button>
            </form>
          )}
        </Formik>
      </div>
    </Page>
  );
};

export default CreateTicketType;
