// "use client";

import axios, { AxiosInstance } from "axios";

const baseUrl = "http://localhost:3000/api";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

export const getProducts: any = async () => {
  const response = await axiosInstance.get("/products");
  return response?.data;
};
