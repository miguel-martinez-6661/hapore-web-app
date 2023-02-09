import React from "react";
import Image from "next/image";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import { useLogin } from "./hooks/use-login";
import { LoginValidationSchema } from "@/validations/login-validation-schema";

const Login = () => {
  const { initialFormValues, handleSubmitForm } = useLogin();

  return (
    <div className="flex flex-col h-screen bg-gray-800 justify-center items-center">
      <Image
        className="mb-5"
        src="/hapore-logo.png"
        width={300}
        height={300}
        alt="icon"
      />
      <div className="flex flex-col bg-white p-8  w-3/4 lg:w-1/4 items-center rounded">
        <h1 className="text-4xl font-bold text-gray-800">Login</h1>

        <Formik
          initialValues={initialFormValues}
          onSubmit={handleSubmitForm}
          validationSchema={LoginValidationSchema}
        >
          {({ values, errors, touched, handleSubmit, handleChange }) => (
            <form
              className="flex flex-col mt-8 gap-4 w-full"
              onSubmit={handleSubmit}
            >
              <TextField
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
              />
              {errors.email && touched.email ? (
                <p className="text-sm text-red-500 -mt-3">{errors.email}</p>
              ) : null}
              <TextField
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={!!errors.password}
              />
              {errors.password && touched.password ? (
                <p className="text-sm text-red-500 -mt-3">{errors.password}</p>
              ) : null}

              {/* {error ? (
                <p className="text-red-500 text-sm text-center">
                  {error.message}
                </p>
              ) : null} */}
              <Button
                type="submit"
                className="bg-blue-500"
                title="Confirmar"
                variant="contained"
                // disabled={isLoading}
              >
                Ingresar
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
