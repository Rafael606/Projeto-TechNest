import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Ícone de checkmark
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Payment = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Pagamento" />
      <div className="pb-10 text-center">
        {/* Ícone com animação de bounce */}
        <div className="flex justify-center items-center mb-4 animate-bounce">
          <FaCheckCircle className="text-5xl text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Compra realizada com sucesso!</h1>
        <p className="text-lg mb-6">
          Agradecemos pela sua compra! Seu pedido está sendo processado e em breve será enviado para você. 
          Fique de olho no seu e-mail para atualizações.
        </p>
        <p className="text-md mb-8">
          Enquanto isso, continue explorando nosso site para descobrir mais ofertas incríveis e os 
          melhores produtos de tecnologia!
        </p>
        <Link to="/">
          <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Explorar mais
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
