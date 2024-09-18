import React from 'react';
import axios from 'axios';

const PayButton = ({ cartItems, onSuccess }) => { // Recebe onSuccess como prop

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/stripe/create-checkout-session', { cartItems });
      window.location.href = data.url;

      if (onSuccess) {
        onSuccess(); // Chama a função de callback após redirecionar
      }
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
    >
      Finalizar Compra
    </button>
  );
};

export default PayButton;
