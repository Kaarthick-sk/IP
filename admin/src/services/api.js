import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Interceptor to add common headers (like auth tokens if needed)
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
