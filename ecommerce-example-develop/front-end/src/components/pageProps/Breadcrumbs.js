import React, { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useLocation } from "react-router-dom";

// Componente Breadcrumbs para exibir o caminho de navegação esta indo pro Shop
const Breadcrumbs = ({ prevLocation, title }) => {
  // Hook para acessar a localização atual da URL
  const location = useLocation();
  
  // Estado para armazenar o caminho da localização atual
  const [locationPath, setLocationPath] = useState("");

  // Hook para atualizar o caminho quando a localização mudar
  useEffect(() => {
    // Atualiza o estado com o primeiro segmento do caminho da URL
    setLocationPath(location.pathname.split("/")[1]);
  }, [location]); // Dependência: quando location muda, o efeito é executado

  return (
    <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
      {/* Título da página */}
      <h1 className="text-5xl text-primeColor font-titleFont font-bold">
        {title}
      </h1>

      {/* Navegação do Breadcrumbs */}
      <p className="text-sm font-normal text-lightText capitalize flex items-center">
        {/* Localização anterior ou 'Home' se não houver localização anterior */}
        <span> {prevLocation === "" ? "Home" : prevLocation}</span>

        {/* Ícone de seta para a direita */}
        <span className="px-1">
          <HiOutlineChevronRight />
        </span>

        {/* Caminho da localização atual */}
        <span className="capitalize font-semibold text-primeColor">
          {locationPath}
        </span>
      </p>
    </div>
  );
};

export default Breadcrumbs;
