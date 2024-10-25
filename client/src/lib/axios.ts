import axios from "axios";

const BASE_URL = 'https://backend.idektep-tracking.com';

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosServer = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
})

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
