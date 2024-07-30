import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Authorization: `Barer ${localStorage.getItem("token")}` },
});

export default api;
