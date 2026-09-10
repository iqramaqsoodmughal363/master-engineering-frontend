import axios from 'axios';

// Localhost ho toh local URL, warna Vercel ka live backend URL use karega
const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : 'https://master-engineering-api.vercel.app/api';

const API = axios.create({
  baseURL: baseURL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;