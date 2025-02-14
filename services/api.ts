import axios from "axios";

const API_URL = "https://qrapivercel.vercel.app/api"; // Asegurar que usa el backend correcto

export const createQR = async (data: { code: string; url: string }) => {
  return axios.post(`${API_URL}/qr`, data);
};

export const getQRs = async () => {
  return axios.get(`${API_URL}/qr`);
};

export const getQRByCode = async (code: string) => {  // ✅ Agregar esta función
  return axios.get(`${API_URL}/qr/${code}`);
};

export const updateQR = async (code: string, url: string) => {
  return axios.put(`${API_URL}/qr/${code}`, { url });
};
