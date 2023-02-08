import httpClient from "@/network/httpClient";
import { LoginParams } from "@/types/api-auth-request";

export const login = async (payload: LoginParams) => {
  return await httpClient
    .post("/authenticate/login", payload)
    .then((data) => data);
};

export const logout = async () => {
  return await httpClient.post("/authenticate/logout");
};
