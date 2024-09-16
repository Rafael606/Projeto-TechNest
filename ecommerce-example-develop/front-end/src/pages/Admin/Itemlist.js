import React from 'react';

const ItemList = ({ items, onEdit, onRemove }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Itens</h2>
      <ul className="space-y-4">
        {items.map(item => (
          <li key={item._id} className="flex items-center border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <img src={item.img} alt={item.productName} className="w-24 h-24 object-cover rounded-lg mr-4" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">{item.productName}</h3>
              <p className="text-gray-700">Preço: {item.price}</p>
              <p className="text-gray-700">Cor: {item.color}</p>
              <div className="mt-2">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => onRemove(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remover
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
