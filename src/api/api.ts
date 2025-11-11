import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // puerto donde corre Flask
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;