import axios from "axios";

const API = axios.create({
  // ✅ Yithe localhost kinva direct backendchi live URL fallback sathi taku shakto
  baseURL: import.meta.env.VITE_API_URL || "https://shopverse-backend-3rg0.onrender.com",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;