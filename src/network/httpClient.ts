import axios, { AxiosInstance } from "axios";
class HttpClient {
  private static classInstance: AxiosInstance;

  public static getInstance() {
    if (!this.classInstance) {
      // @ts-ignore
      this.classInstance = new axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return this.classInstance;
  }
}

export default HttpClient.getInstance();
