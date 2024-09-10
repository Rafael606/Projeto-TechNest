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

const register = async (user) => {
  try {
    const response = await api.post('auth/register', user);
    return response.data;
  } catch (error) {
    console.error('Erro ao realizar registro:', error);
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

const getUserProfile = async () => {
  try {
    const response = await fetch('/api/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Adicione um token de autenticação se necessário
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

export default { login, logout, register, getCurrentUser, getUserProfile };
