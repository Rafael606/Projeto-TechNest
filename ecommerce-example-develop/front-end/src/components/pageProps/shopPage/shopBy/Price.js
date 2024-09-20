import React, { useState } from "react";
import NavTitle from "./NavTitle";

// Componente para seleção de faixa de preços
const Price = () => {
  // Estados para armazenar o preço mínimo e máximo selecionados
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Função chamada ao mudar o preço mínimo
  const handleMinPriceChange = (e) => {
    setMinPrice(Number(e.target.value));
  };

  // Função chamada ao mudar o preço máximo
  const handleMaxPriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  // Função para formatar o preço para o formato brasileiro
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="cursor-pointer">
      {/* Título do componente, sem ícones */}
      <NavTitle title="Escolha por preço" icons={false} />
      <div className="font-titleFont">
        {/* Contêiner para os controles de faixa de preços */}
        <div className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {/* Controle para o preço mínimo */}
          <div className="flex items-center gap-2">
            <label className="text-sm">Preço Mínimo:</label>
            <input
              type="range" // Controle deslizante para o preço mínimo
              min={0} // Valor mínimo
              max={20000} // Valor máximo
              step={1} // Incremento
              value={minPrice} // Valor atual
              onChange={handleMinPriceChange} // Função chamada ao mudar o valor
              className="w-full" // Estilo de largura total
            />
            <span>R${formatPrice(minPrice)}</span> {/* Exibe o preço mínimo formatado */}
          </div>
          {/* Controle para o preço máximo */}
          <div className="flex items-center gap-2">
            <label className="text-sm">Preço Máximo:</label>
            <input
              type="range" // Controle deslizante para o preço máximo
              min={0} // Valor mínimo
              max={20000} // Valor máximo
              step={1} // Incremento
              value={maxPrice} // Valor atual
              onChange={handleMaxPriceChange} // Função chamada ao mudar o valor
              className="w-full" // Estilo de largura total
            />
            <span>R${formatPrice(maxPrice)}</span> {/* Exibe o preço máximo formatado */}
          </div>
          {/* Lista adicional (vazia no momento) */}
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Price;
