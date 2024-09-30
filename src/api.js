// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Signup function
export const signup = async (username, password, token) => {
  const response = await api.post("/signup", { username, password, token });
  return response.data;
};

// Login function
export const login = async (username, password) => {
  const response = await api.post("/login", { username, password });
  return response.data;
};

// Upload PR number
export const uploadPrNumber = async (username, prNumber) => {
  const response = await api.post("/pr", { username, prNumber });
  return response.data;
};
