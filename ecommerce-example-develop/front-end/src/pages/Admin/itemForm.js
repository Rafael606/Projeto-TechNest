import React, { useState, useEffect } from 'react';
import categoriesService from '../../services/categories';
import product from '../../services/product';
import { Alert, Snackbar } from "@mui/material";

const ItemForm = ({ onAddItem, onEditItem, item }) => {
  const [formData, setFormData] = useState({
    id: '',
    img: null, // Inicialmente, img será null, pois é um arquivo
    nome: '',
    description: '',
    unit_price: '',
    stock_quantity: '',
    categoria: '', // Categoria será uma string (ID da categoria)
    badge: false,
    brand: '',
    ficheTech: []
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [categories, setCategories] = useState([]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const saveProduct = async () => {
    try {
      const data = new FormData(); // Criar o FormData
      data.append('nome', formData.nome);
      data.append('description', formData.description);
      data.append('unit_price', formData.unit_price);
      data.append('stock_quantity', formData.stock_quantity);

      // Enviar categoria como um array
      const selectedCategory = formData.categoria ? [formData.categoria] : [];
      data.append('categories', JSON.stringify(selectedCategory)); // Enviar como string JSON

      // Apenas adicionar a imagem ao FormData se ela foi selecionada
      if (formData.img) {
        data.append('img', formData.img); // Adicionar a imagem ao FormData
      } else {
        console.error("Nenhuma imagem foi selecionada");
      }

      // Exibe os dados do FormData para verificar o conteúdo antes de enviar
      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Chamar o serviço de criação do produto com FormData
      await product.created(data);

      setSnackbarSeverity("success");
      setSnackbarMessage("Produto cadastrado com sucesso!");
      setOpenSnackbar(true);

      // Limpar o formulário após o envio
      setFormData({
        id: '',
        img: null,
        nome: '',
        description: '',
        unit_price: '',
        stock_quantity: '',
        categoria: '',
        badge: false,
        brand: '',
        ficheTech: []
      });
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Erro ao cadastrar o produto!");
      setOpenSnackbar(true);
      console.error("Erro ao cadastrar o produto:", error);
    }
  };

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
      setFormData({
        ...item,
        categoria: item.categories.length > 0 ? item.categories[0].id : '', // Pegue o ID da única categoria
        img: null // Reiniciar o campo de imagem ao editar
      });
    } else {
      setFormData({
        id: '',
        img: null,
        nome: '',
        description: '',
        unit_price: '',
        stock_quantity: '',
        categoria: '',
        badge: false,
        brand: '',
        ficheTech: []
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      // Armazenamos o arquivo diretamente no estado formData
      setFormData({
        ...formData,
        [name]: files[0] || null // Armazena o arquivo (ou null se não houver arquivo)
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
      saveProduct();
      onAddItem(formData);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-white p-6 md:p-10">
      <div className="w-full max-w-[800px] bg-white border border-gray-300 p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {item ? 'Editar Item' : 'Adicionar Item'}
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
                value={formData.categoria}
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
                  Arquivo selecionado: {formData.img.name}
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
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ItemForm;