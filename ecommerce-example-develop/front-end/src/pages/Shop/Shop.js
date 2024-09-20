import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const Shop = () => {
  // Estado para controlar a quantidade de itens por página
  const [itemsPerPage, setItemsPerPage] = useState(48);

  // Função para atualizar a quantidade de itens por página a partir do banner de produtos
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      {/* Componente de breadcrumbs para navegação */}
      <Breadcrumbs title="Produtos" />

      {/* ================= Produtos começam aqui =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        {/* Navegação lateral do shop, visível em tamanhos de tela médio e acima */}
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
        {/* Seção principal dos produtos, exibindo banner e paginação */}
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          {/* Banner de produtos com função de atualizar a quantidade de itens por página */}
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          {/* Componente de paginação exibindo a quantidade de itens por página */}
          <Pagination itemsPerPage={itemsPerPage} />
        </div>
      </div>
      {/* ================= Produtos terminam aqui ===================== */}
    </div>
  );
};

export default Shop;
