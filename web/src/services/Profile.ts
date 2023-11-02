import axios, { AxiosResponse } from "axios";
import firebase from "firebase/compat/app";

axios.defaults.baseURL = "http://localhost:3001";

axios.interceptors.request.use(
  async function (config) {
    debugger;
    const token = localStorage.getItem("token");

    if (!!token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    } else {
      delete config.headers["Authorization"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    debugger;
    if (error.response.data?.code === "auth/id-token-expired" || error.response.data?.code === "no-token-provided") {
      // token expired
      localStorage.removeItem("token");
      window.location.href = "/signin";
      firebase.auth().signOut();
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export class ProfileService {
  public static async updateProfile(payload: any): Promise<AxiosResponse<any>> {
    return axios.put("/profile", payload);
  }

  public static async getProfile(): Promise<AxiosResponse<any>> {
    return axios.get("/profile");
  }
}
