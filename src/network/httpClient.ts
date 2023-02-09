import axios, { AxiosInstance } from "axios";

class HttpClient {
  private static classInstance: AxiosInstance;

  public static getInstance() {
    if (!this.classInstance) {
      // @ts-ignore
      this.classInstance = new axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return this.classInstance;
  }
}
export default HttpClient.getInstance();
