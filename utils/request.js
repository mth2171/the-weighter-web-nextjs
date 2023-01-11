import axios from "axios";

export const barcodeRequest = axios.create({
  baseURL: process.env.REACT_APP_OPENAPI_URL,
  withCredentials: false,
  header: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const infoRequest = axios.create({
  baseURL: process.env.REACT_APP_PRODUCT_URL,
  withCredentials: false,
  header: {
    "Access-Control-Allow-Origin": "*",
  },
});
