import axios from 'axios';

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
