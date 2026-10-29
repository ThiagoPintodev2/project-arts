import axios from 'axios';

const instance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    (import.meta.env.DEV ? "http://localhost:8081" : "https://api.cspaceart.com.br"),
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('auth:logout'));
    }
    return Promise.reject(error);
  }
);

export default instance;