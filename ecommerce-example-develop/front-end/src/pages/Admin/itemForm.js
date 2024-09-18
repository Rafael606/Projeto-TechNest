import React, { useState, useEffect } from 'react';
import categoriesService from '../../services/categories';

const ItemForm = ({ onAddItem, onEditItem, item }) => {
  const [formData, setFormData] = useState({
    id: '',
    img: '',
    nome: '',
    description: '',
    unit_price: '',
    stock_quantity: '',
    categoria: '', // Alterado para string (um único valor)
    badge: false,
    brand: '',
    ficheTech: []
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Buscar as categorias do backend quando o componente for montado
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoriesService.findAll();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategories();

    if (item) {
      // Se o item tiver uma categoria, definir a categoria no formData
      setFormData({
        ...item,
        categoria: item.categories.length > 0 ? item.categories[0].id : '' // Pegue o ID da única categoria
      });
    } else {
      setFormData({
        id: '',
        img: '',
        nome: '',
        description: '',
        unit_price: '',
        stock_quantity: '',
        categoria: '', // Garantir que o campo de categoria inicie vazio
        badge: false,
        brand: '',
        ficheTech: []
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0] ? files[0].name : '' // Apenas o nome do arquivo
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item) {
      onEditItem(formData);
    } else {
      onAddItem(formData);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-white p-6 md:p-10">
      <div className="w-full max-w-[800px] bg-white border border-gray-300 p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {item ? 'Editar Item' : 'Adicionar Item'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="_id" className="font-medium text-gray-700">ID</label>
              <input
                type="text"
                name="_id"
                id="_id"
                value={formData.id}
                onChange={handleChange}
                placeholder="ID"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="nome" className="font-medium text-gray-700">Nome do Produto</label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome do Produto"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="unit_price" className="font-medium text-gray-700">Preço</label>
              <input
                type="text"
                name="unit_price"
                id="unit_price"
                value={formData.unit_price}
                onChange={handleChange}
                placeholder="Preço"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="stock_quantity" className="font-medium text-gray-700">Quantidade em Estoque</label>
              <input
                type="text"
                name="stock_quantity"
                id="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                placeholder="Quantidade em Estoque"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="font-medium text-gray-700">Descrição</label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descrição"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="categoria" className="font-medium text-gray-700">Categoria</label>
              <select
                name="categoria"
                id="categoria"
                value={formData.categoria} // Valor selecionado da categoria única
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="img" className="font-medium text-gray-700">Imagem</label>
              <input
                type="file"
                name="img"
                id="img"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {formData.img && (
                <p className="mt-1 text-sm text-gray-500 truncate overflow-hidden whitespace-nowrap">
                  Arquivo selecionado: {formData.img}
                </p>
              )}
            </div>

          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {item ? 'Editar Item' : 'Adicionar Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;