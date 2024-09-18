import React, { useState } from "react";
import NavTitle from "./NavTitle";

const Price = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const priceList = [
    { _id: 950, priceOne: 0.0, priceTwo: 49.99 },
    { _id: 951, priceOne: 50.0, priceTwo: 99.99 },
    { _id: 952, priceOne: 100.0, priceTwo: 199.99 },
    { _id: 953, priceOne: 200.0, priceTwo: 399.99 },
    { _id: 954, priceOne: 400.0, priceTwo: 599.99 },
    { _id: 955, priceOne: 600.0, priceTwo: 1000.0 },
  ];

  const handleMinPriceChange = (e) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="cursor-pointer">
      <NavTitle title="Escolha por preço" icons={false} />
      <div className="font-titleFont">
        <div className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          <div className="flex items-center gap-2">
            <label className="text-sm">Preço Mínimo:</label>
            <input
              type="range"
              min={0}
              max={20000}
              step={1}
              value={minPrice}
              onChange={handleMinPriceChange}
              className="w-full"
            />
            <span>R${formatPrice(minPrice)}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Preço Máximo:</label>
            <input
              type="range"
              min={0}
              max={20000}
              step={1}
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="w-full"
            />
            <span>R${formatPrice(maxPrice)}</span>
          </div>
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {priceList
              .filter(item => item.priceOne >= minPrice && item.priceTwo <= maxPrice)
              .map((item) => (
                <li
                  key={item._id}
                  className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
                >
                  R${formatPrice(item.priceOne)} - R${formatPrice(item.priceTwo)}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Price;
