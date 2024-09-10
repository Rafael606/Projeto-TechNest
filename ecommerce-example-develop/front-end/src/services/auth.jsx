import api from './api';

const login = async (email, password) => {
  try {
    const response = await api.post('auth/login', { email, password });
    
    // Captura o token do corpo da resposta e salva no localStorage
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error;
  }
};

const register = async (user) => {
  try {
    const response = await api.post('auth/register', user);
    return response.data;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export default { login, logout, register, getCurrentUser };