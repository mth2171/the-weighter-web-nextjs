import axios from "axios";

export const barcodeRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_OPENAPI_URL,
  withCredentials: false,
  header: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const infoRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_URL,
  withCredentials: false,
  header: {
    "Access-Control-Allow-Origin": "*",
  },
});