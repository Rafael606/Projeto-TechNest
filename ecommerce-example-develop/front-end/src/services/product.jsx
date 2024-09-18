import api from './api';

const created = async (produto) => {
    try {
      const response = await api.post('products/', produto);
      return response.data;
    } catch (error) {
      console.error('Erro ao realizar registro:', error);
      throw error;
    }
  };

const findAll = async () => {
  try {
    const response = await api.get('products/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

export default { findAll, created };