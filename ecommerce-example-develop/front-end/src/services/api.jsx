import axios from 'axios';

// Configura o interceptor global do axios para incluir o token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no formato Bearer <token>
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Configuração básica do Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000, // Define um timeout de 10 segundos para as requisições
  headers: {
    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON por padrão
    'Accept': 'application/json',
  },
});

export default api;
