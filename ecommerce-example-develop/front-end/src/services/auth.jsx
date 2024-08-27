import api from './api';

const login = async (email, password) => {
  try {
    const response = await api.post('auth/login', { email, password });
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

export default { login, logout, getCurrentUser };