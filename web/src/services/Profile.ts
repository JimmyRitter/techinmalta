import { useAuthContext } from "@/context/AuthContext";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:3001";


// Add a request interceptor
axios.interceptors.request.use(async function (config) {
    const token = localStorage.getItem("token");

    if (!!token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['Content-Type'] = "application/json";
    } else {
        config.headers['Authorization'] = null;
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
  });


export class ProfileService {
  public static async updateProfile(payload: any): Promise<AxiosResponse<any>> {
    return axios.put("/profile", payload);
  }

  public static async getProfile(): Promise<AxiosResponse<any>> {
    return axios.get("/profile");
  }
}
