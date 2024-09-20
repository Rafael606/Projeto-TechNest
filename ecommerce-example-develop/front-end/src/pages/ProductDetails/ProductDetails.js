import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { FaDownload } from "react-icons/fa";

// Definição das abas disponíveis para o componente
const tabs = [
  {
    id: "Fiche Technique",
    label: "Ficha Técnica",
  },
  {
    id: "Description",
    label: "Descrição",
    content: "",
  },
  {
    id: "Video",
    label: "Vídeo",
    content: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/watch?v=6e0yIRDVPlA&list=RD6e0yIRDVPlA&start_radio=1"
        title="YouTube Video"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    ),
  },
  // Adicione mais abas conforme necessário
];

const ProductDetails = () => {
  // Hook para obter a localização atual
  const location = useLocation();
  // Estado para armazenar o caminho da página anterior
  const [prevLocation, setPrevLocation] = useState("");
  // Estado para armazenar as informações do produto
  const [productInfo, setProductInfo] = useState([]);
  // Estado para armazenar a aba ativa
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Função chamada ao clicar em uma aba
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // Efeito colateral para atualizar as informações do produto e o caminho da página anterior
  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, productInfo.ficheTech]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          {/* Componente de breadcrumbs para navegação */}
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          {/* Imagem do produto */}
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full "
              src={productInfo.img}
              alt={productInfo.img}
            />
          </div>
          {/* Informações do produto */}
          <div className="h-full w-full md:col-span-2 xl:col-span-4 xl:px-4 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
        <div>
          {/* Botões para seleção de abas */}
          <div className="space-x-4 pt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } py-2 px-4 focus:outline-none`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Conteúdo das abas */}
          <div className="my-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={activeTab === tab.id ? "" : "hidden"}
              >
                {tab.id === "Fiche Technique" && productInfo.ficheTech ? (
                  <div>
                    {/* Tabela com a ficha técnica do produto */}
                    <table className="table-auto w-full">
                      <tbody>
                        {productInfo.ficheTech.map((row) => (
                          <tr key={row.label} className="bg-gray-100">
                            <td className="border px-4 py-2 font-semibold">
                              {row.label}
                            </td>
                            <td className="border px-4 py-2">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Botão para download do PDF */}
                    <div className="my-4 flex justify-end">
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-500 hover:bg-blue-600 text-white font-bodyFont">
                        <FaDownload className="h-5 w-5 mr-2 text-white" />
                        <a
                          href={productInfo.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white"
                        >
                          Download PDF
                        </a>{" "}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>{tab.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
