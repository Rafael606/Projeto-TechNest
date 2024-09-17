import React from 'react';
import axios from 'axios';

const PayButton = ({ cartItems }) => {

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/stripe/create-checkout-session', { cartItems });
      window.location.href = data.url;
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
