import * as Yup from "yup";

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Email no valido").required("Requerido"),
  password: Yup.string()
    .required("Requerido")
    .min(6, "Contraseña no valida")
    .max(12, "Contraseña no valida"),
});
