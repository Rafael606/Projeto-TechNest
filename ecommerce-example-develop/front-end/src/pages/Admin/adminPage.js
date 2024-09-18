import React, { useState, useEffect } from 'react';
import { paginationItems as initialItems } from '../../constants/index.js';
import ItemForm from './itemForm';
import ItemList from './Itemlist.js';
import product from "../../services/product";

const AdminPage = () => {
  const [items, setItems] = useState(initialItems);
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleEditItem = (updatedItem) => {
    setItems(items.map(item => (item._id === updatedItem._id ? updatedItem : item)));
    setEditingItem(null);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item._id !== id));
  };

  useEffect(() => {
    // Carregar dados do usuário ao montar o componente
    product.findAll().then(produtos => {
      setItems(produtos);
      console.log(produtos);
    }).catch(error => {
      console.error("Erro ao carregar produtos:", error);
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Painel de Administração</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <ItemForm onAddItem={handleAddItem} onEditItem={handleEditItem} item={editingItem} />
      </div>
      <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <ItemList items={items} onEdit={setEditingItem} onRemove={handleRemoveItem} />
      </div>
    </div>
  );
};

export default AdminPage;
