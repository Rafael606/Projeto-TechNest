import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import { paginationItems } from "../../../constants";

// Itens para paginação, importados de uma constante
const items = paginationItems;

// Componente para exibir itens filtrados
function Items({ currentItems, selectedBrands, selectedCategories }) {
  // Filtra os itens com base nas marcas e categorias selecionadas
  const filteredItems = currentItems.filter((item) => {
    const isBrandSelected =
      selectedBrands.length === 0 ||
      selectedBrands.some((brand) => brand.title === item.brand);

    const isCategorySelected =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => category.title === item.cat);

    return isBrandSelected && isCategorySelected;
  });

  return (
    <>
      {filteredItems.map((item) => (
        <div key={item._id} className="w-full">
          <Product
            _id={item._id}
            img={item.img}
            productName={item.productName}
            price={item.price}
            color={item.color}
            badge={item.badge}
            des={item.des}
            pdf={item.pdf}
            ficheTech={item.ficheTech}
          />
        </div>
      ))}
    </>
  );
}

// Componente de paginação
const Pagination = ({ itemsPerPage }) => {
  // Estado para armazenar o deslocamento dos itens e o índice inicial
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  // Calcula o deslocamento final dos itens e os itens atuais a serem exibidos
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);

  // Obtém as marcas e categorias selecionadas do estado global
  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );
  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );

  // Calcula o número total de páginas
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Função chamada ao clicar em uma página
  const handlePageClick = (event) => {
    // Calcula o novo deslocamento e o novo índice inicial
    const newOffset = (event.selected * itemsPerPage) % items.length;
    const newStart = newOffset + 1; // Ajusta o índice inicial

    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  return (
    <div>
      {/* Exibe os itens filtrados e paginados */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items
          currentItems={currentItems}
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
        />
      </div>

      {/* Controles de paginação e informações sobre os produtos exibidos */}
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel="" // Texto para o botão "Próximo" (vazio aqui)
          onPageChange={handlePageClick} // Função chamada ao clicar em uma página
          pageRangeDisplayed={3} // Número de páginas exibidas na faixa
          marginPagesDisplayed={2} // Número de páginas exibidas nas margens
          pageCount={pageCount} // Total de páginas
          previousLabel="" // Texto para o botão "Anterior" (vazio aqui)
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center" // Estilo dos links das páginas
          pageClassName="mr-6" // Margem direita dos links das páginas
          containerClassName="flex text-base font-semibold font-titleFont py-10" // Estilo do contêiner de paginação
          activeClassName="bg-black text-white" // Estilo para a página ativa
        />

        {/* Exibe a faixa de produtos exibidos e o total de produtos */}
        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, items.length)} of{" "}
          {items.length}
        </p>
        <button onClick={() => console.log(selectedBrands)}> test</button> {/* Botão de teste */}
      </div>
    </div>
  );
};

export default Pagination;
