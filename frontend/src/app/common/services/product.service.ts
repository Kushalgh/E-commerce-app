// "use client";

import axios, { AxiosInstance } from "axios";

const baseUrl = "http://localhost:3000/api";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

export const getProducts: any = async (params?: any) => {
  const response = await axiosInstance.get("/products", {
    params,
  });
  return response?.data;
};

export const getCategory: any = async () => {
  const response = await axiosInstance.get("/categories");
  return response?.data;
};

export const getProductByCategory: any = async (id: string) => {
  const response = await axiosInstance.get("/categories", {
    params: id,
  });
  return response.data;
};
