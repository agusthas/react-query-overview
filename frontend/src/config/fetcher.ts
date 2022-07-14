import axios from 'axios';

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001',
});

export default fetcher;
