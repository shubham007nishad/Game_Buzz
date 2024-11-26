import axios from 'axios';

// Replace with your Django API URL
const API_URL = 'http://127.0.0.1:8000/'; // Or wherever your backend is hosted

const api = axios.create({
  baseURL: API_URL,
});

export default api;