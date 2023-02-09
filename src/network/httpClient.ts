import axios, { AxiosInstance } from "axios";

const HOST = process.env.API_HOST;
class HttpClient {
  private static classInstance: AxiosInstance;

  public static getInstance() {
    if (!this.classInstance) {
      // @ts-ignore
      this.classInstance = new axios.create({
        baseURL: `${HOST}/api`,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return this.classInstance;
  }
}

export default HttpClient.getInstance();
