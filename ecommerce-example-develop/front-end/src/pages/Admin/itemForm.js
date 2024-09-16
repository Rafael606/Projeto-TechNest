import React, { useState, useEffect } from 'react';

const ItemForm = ({ onAddItem, onEditItem, item }) => {
  const [formData, setFormData] = useState({
    _id: '',
    img: '',
    productName: '',
    price: '',
    color: '',
    badge: false,
    brand: '',
    des: '',
    cat: '',
    pdf: '',
    ficheTech: []
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        _id: '',
        img: '',
        productName: '',
        price: '',
        color: '',
        badge: false,
        brand: '',
        des: '',
        cat: '',
        pdf: '',
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
                value={formData._id} 
                onChange={handleChange} 
                placeholder="ID" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="productName" className="font-medium text-gray-700">Nome do Produto</label>
              <input 
                type="text" 
                name="productName" 
                id="productName" 
                value={formData.productName} 
                onChange={handleChange} 
                placeholder="Nome do Produto" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="price" className="font-medium text-gray-700">Preço</label>
              <input 
                type="text" 
                name="price" 
                id="price" 
                value={formData.price} 
                onChange={handleChange} 
                placeholder="Preço" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="color" className="font-medium text-gray-700">Cor</label>
              <input 
                type="text" 
                name="color" 
                id="color" 
                value={formData.color} 
                onChange={handleChange} 
                placeholder="Cor" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="brand" className="font-medium text-gray-700">Marca</label>
              <input 
                type="text" 
                name="brand" 
                id="brand" 
                value={formData.brand} 
                onChange={handleChange} 
                placeholder="Marca" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="des" className="font-medium text-gray-700">Descrição</label>
              <textarea 
                name="des" 
                id="des" 
                value={formData.des} 
                onChange={handleChange} 
                placeholder="Descrição" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="cat" className="font-medium text-gray-700">Categoria</label>
              <input 
                type="text" 
                name="cat" 
                id="cat" 
                value={formData.cat} 
                onChange={handleChange} 
                placeholder="Categoria" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
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
              {formData.img && <p className="mt-1 text-sm text-gray-500">Arquivo selecionado: {formData.img}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="pdf" className="font-medium text-gray-700">PDF</label>
              <input 
                type="file" 
                name="pdf" 
                id="pdf" 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {formData.pdf && <p className="mt-1 text-sm text-gray-500">Arquivo selecionado: {formData.pdf}</p>}
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
