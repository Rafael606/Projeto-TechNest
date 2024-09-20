import {
  pdf1,
  IMPRIMANTE_PANTUM_CP2200DW,
  IMPRIMANTE_PANTUM_BM5100FDW,
  IMPRIMANTE_PANTUM_M6609N,
  IMPRIMANTE_PANTUM_BP5100DN,
} from "../assets/images/index";

import img5 from "./vento1.png"
import img2 from "./gabinete3.png"
import img3 from "./gabinete4.png"
import img4 from "./placa2.png"

import "./style.css";

// =================== NavBarList Começa aqui ====================
export const navBarList = [
  {
    _id: 1001,
    title: "Início",
    link: "/",
  },
  {
    _id: 1002,
    title: "Loja",
    link: "/shop",
  },
  {
    _id: 1003,
    title: "Sobre",
    link: "/about",
  },
  {
    _id: 1004,
    title: "contate-nos",
    link: "contact",
  },
];
// =================== NavBarList Termina aqui ======================

// =================== Itens de Paginação Começa aqui ===============

export const paginationItems = [
  {
    _id: "201",
    img: IMPRIMANTE_PANTUM_CP2200DW,
    productName: "Impressora PANTUM CP2200DW",
    price: "350.00",
    color: "Branco",
    badge: true,
    brand: "Pantum",
    des: "Impressora a laser PANTUM colorida - Funções: Impressão - Tecnologia de impressão: Laser - Formato de papel: A4 - Velocidade de impressão (Colorido/P&B): 24 ppm (A4) / 26 ppm (Carta) - Resolução de impressão: 600 x 600 dpi - Saída de papel: 100 páginas - Memória: Processador dual-core, 1 GHz - Impressão duplex: Automática - Tempo para a primeira impressão: Menos de 11s - Conectores: USB 2.0 de alta velocidade Ethernet 10/100/1000 BaseTX (RJ-45) 802.11b/g/n Sem fio - Dimensões: 411,2 x 394,1 x 243,7 mm - Peso: 16,1 kg - Cor: Branco",
    cat: "Impressora",
    pdf: pdf1,
    ficheTech: [
      { label: "Tecnologia", value: "Laser monocromático por eletrofotografia" },
      { label: "Velocidade de impressão", value: "22 ppm (A4)/23 ppm (Carta)" },
      { label: "Tempo para a primeira impressão", value: "Menos de 7,8s" },
      { label: "Ciclo de trabalho mensal máximo", value: "15.000 páginas" },
      { label: "Volume mensal recomendado", value: "700 páginas" },
      { label: "Modo duplex", value: "Máximo 1.200×1.200 dpi" },
      { label: "Impressora", value: "Máximo 1.2" },
      { label: "Vidro", value: "Máximo 1.2" },
    ],
  },
  {
    _id: "202",
    img: IMPRIMANTE_PANTUM_BM5100FDW,
    productName: "IMPRESSORA PANTUM BM5100FDW",
    price: "450.00",
    color: "Branco",
    badge: true,
    brand: "Pantum",
    des: "Pantum BM5100fdw Impressora a laser monocromática: Pantum BM5100fdw - Impressora: laser - multifuncional monocromática, formato A4, 4-em-1 com funções de impressão, cópia, digitalização e fax, velocidade de impressão de 40ppm, conexão LAN RJ45, Wi-Fi.",
    cat: "Impressora",
    pdf: pdf1,
    ficheTech: [
      { label: "Velocidade de impressão", value: "40ppm (A4)/42ppm (Carta)" },
      { label: "Tempo de saída da primeira página", value: "≤6,9 s" },
      { label: "Volume mensal recomendado", value: "750 a 4.000 páginas" },
      { label: "Resolução de impressão", value: "Máx. 1.200x1.200 dpi" },
      { label: "Linguagem de impressão", value: "PCL5e, PCL6, PS" },
      { label: "Velocidade do processador", value: "1,2 GHz" },
      { label: "Memória", value: "512 MB" },
      { label: "Painel de controle", value: "LCD 2 linhas || Tela sensível ao toque de 3,5 polegadas" },
      { label: "Impressão duplex automática", value: "Sim" },
      { label: "Outras funções de impressão", value: "Impressão de brochuras, impressão segura, impressão de disco USB compatível com AirPrint, Mopria, APP móvel (iOS/Android)" },
      { label: "Velocidade de cópia", value: "40ppm (A4)/42ppm (Carta)" },
      { label: "Tempo de saída da primeira cópia", value: "Bandeja: menos de 10 s ADF: menos de 11 s" },
    ],
  },
  {
    _id: "203",
    img: IMPRIMANTE_PANTUM_BP5100DN,
    productName: "IMPRESSORA PANTUM BP5100DN",
    price: "450.00",
    color: "Branco",
    badge: true,
    brand: "Pantum",
    des: "Impressora Monocromática Laser PANTUM BP5100DN: Funções de impressão - Capacidade de bandeja de papel 250 páginas - Formato de papel: A4 - Tecnologia de impressão Laser Monocromática - Velocidade de impressão Preto & Branco: Até 40 páginas por minuto em A4 - Resolução: 1.200 dpi - Memória: 512 MB - Conectividade Ethernet, USB 2.0 - Duplex automático - Pronta para rede: Impressão silenciosa - Dimensões: 364 x 344 x 257 mm - Peso: 9,3 kg - Garantia: 1 ano",
    cat: "Impressora",
    pdf: pdf1,
    ficheTech: [
      { label: "Velocidade de impressão", value: "40ppm (A4)/42ppm (Carta)" },
      { label: "Tempo de saída da primeira página", value: "≤6,9 s" },
      { label: "Volume mensal recomendado", value: "750 a 4.000 páginas" },
      { label: "Resolução de impressão", value: "Máx. 1.200x1.200 dpi" },
      { label: "Linguagem de impressão", value: "PCL5e, PCL6, PS" },
      { label: "Velocidade do processador", value: "1,2 GHz" },
      { label: "Memória", value: "512 MB" },
      { label: "Painel de controle", value: "LCD 2 linhas || Tela sensível ao toque de 3,5 polegadas" },
      { label: "Impressão duplex automática", value: "Sim" },
      { label: "Outras funções de impressão", value: "Impressão de brochuras, impressão segura, impressão de disco USB compatível com AirPrint, Mopria, APP móvel (iOS/Android)" },
      { label: "Velocidade de cópia", value: "40ppm (A4)/42ppm (Carta)" },
      { label: "Tempo de saída da primeira cópia", value: "Bandeja: menos de 10 s ADF: menos de 11 s" },
    ],
  },
  {
    _id: "2005",
    img: IMPRIMANTE_PANTUM_M6609N,
    productName: "IMPRESSORA PANTUM M6559N",
    price: "450.00",
    color: "Branco",
    badge: true,
    brand: "Pantum",
    des: "Impressora Laser 3-em-1 com toner recarregável PANTUM M6559N - Capacidade de impressão de até 1.600 páginas - Velocidade de impressão: 22 ppm (A4) / 23 ppm (Carta) - Resolução (impressão, cópia e digitalização): 1.200×1.200dpi - Tempo da primeira impressão: Menos de 7,8s - Conectividade: USB 2.0 de alta velocidade - Velocidade de cópia: 22 cpm (A4) / 23 cpm (Carta) - Capacidade do alimentador automático de documentos: 35 páginas - Entrada de papel: 150 páginas - Saída de papel: 100 páginas - Dimensões: 417 x 305 x 301 mm - Peso: 8,5 kg - Garantia de 1 ano",
    cat: "Impressora",
    pdf: pdf1,
    ficheTech: [
      { label: "Código GTIN", value: "M6559N" },
      { label: "Capacidade de impressão", value: "Até 1.600 páginas" },
      { label: "Função", value: "3 em 1" },
      { label: "Tecnologia", value: "Laser monocromático" },
    ],
  },



  // =================== mais =================

  {
    _id: "id1",
    img: img2,
    productName: "Computador Pichau WorkStation",
    price: "49499.96",
    color: "Preto",
    badge: true,
    brand: "Pichau",
    des: "Descrição: Computador Pichau WorkStation WS382, AMD Ryzen Threadripper 7960X, Quadro RTX A4500 20GB, 64GB DDR5, 2X SSD M.2 4TB",
    cat: "Gabinete",
    pdf: pdf1,
    ficheTech: [
      { label: "Processador", value: "1 x Processador AMD Ryzen Threadripper 7960X, 24-Core, 48-Threads, 4.2GHz (5.3GHz Turbo)" },
      { label: "Cooler", value: "1 x Water Cooler Corsair Icue H150i Elite Capellix XT, RGB, 360mm, Preto, CW-9060070-WW" },
      { label: "Placa mãe", value: "1 x Placa Mae AsRock TRX50 WS, DDR5, Socket AMD sTR5, E-ATX, Chipset AMD TRX50, TRX5" },
      { label: "Placa de vídeo", value: "1 x Placa de Video PNY Quadro RTX A4500, 20GB, GDDR6, 320-bit, VCNRTXA4500-PB" },
      { label: "TelMemória", value: "1 x Memoria Corsair WS DDR5 RDIMM, 64GB (4x16GB), DDR5, 6000MT/s, C40, Preta, CMA64G" }
    ]
  },

  {
    _id: "id2",
    img: img3,
    productName: "PC Home Pichau HM786",
    price: "2819.99",
    color: "Preto",
    badge: true,
    brand: "Pichau",
    des: "PC Home Pichau HM786, AMD Ryzen 5 5600GT, 16GB DDR4, SSD 480GB + Monitor + Kit Periféricos",
    cat: "Gabinete",
    pdf: pdf1,
    ficheTech: [
      { label: "Processaor", value: "1 x Processador AMD Ryzen 5 5600GT, 6-Core, 12-Threads, 3.6GHz (4.6GHz Turbo), Cache 19" },
      { label: "Placa Mae", value: "1 x Placa Mae Mancer A520M-DX, DDR4,Socket AMD AM4, M-ATX, Chipset AMD A520, MCR-A" },
      { label: "Memoria", value: "2 x Memoria Team Group T-Force Vulcan Pichau RTB, 8GB, (1x8GB), DDR4, 3000MHz, Branca" },
      { label: "SSS", value: "1 x SSD Lexar NS100, 512GB, Sata III 6GB/s, Leitura 550MB/s, Gravacao 520MB/s, LNS100-51" },
      { label: "Fonte", value: "1 x Fonte TGT Tomahawk, 500W, Preto, TMWK500-OEM" },
    ]
  },
  // =================== mais =================
  {
    _id: "id4",
    img: img4,
    productName: "Kit upgrade",
    price: "450.00",
    color: "Branco",
    badge: true,
    brand: "",
    des: "TechNest Kit upgrade, Intel i7-14700, B760 DDR5",
    cat: "",
    pdf: pdf1,
    ficheTech: [
      { label: "Processador", "value": "1 x Processador Intel Core i7-14700, 20-Core, 28-Threads, 3.4GHz (5.4GHz Turbo), Cache 33M" },
      { label: "Placa Mae", "value": "1 x Placa Mae AsRock B760 PRO RS, DDR5, LGA 1700, ATX, Chipset Intel B760, B760-PRO-RS" },
    ],
  },

  {
    _id: "id5",
    img: img5,
    productName: "Kit Ventoinhas Iceberg",
    price: "450.00",
    color: "Branco",
    badge: true,
    brand: "Iceberg Thermal",
    des: "Kit Ventoinhas Iceberg Thermal IceGale, ARGB, 2x140mm, Preto e Branco, ICEGALE14A-B2A",
    cat: "",
    pdf: pdf1,
    ficheTech: [
      { label: "DISPONIBILIDADE", "value": "Em estoque" },
    ],
  }
];
