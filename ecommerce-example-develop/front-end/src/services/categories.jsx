import api from './api';

const findAll = async () => {
  try {
    const response = await api.get('categories/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
};

export default { findAll };