import axios from "axios";
import { LoginParams } from "@/types/api-auth-request";

export const login = async (payload: LoginParams) => {
  return await axios
    .post("/api/authenticate/login", payload)
    .then((data) => data);
};

export const logout = async () => {
  return await axios.post("/api/authenticate/logout");
};
