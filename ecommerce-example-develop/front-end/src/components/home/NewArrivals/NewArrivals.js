import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
// import {
//   newArrOne,
//   newArrTwo,
//   newArrThree,
//   newArrFour,
// } from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import imgplaca from './placamae1.png';
import imgteclado from './teclado1.png';
import imgmonitor from './monitor2.png';
import imggabinete from './gabinete2.png';
import imgps5 from './ps5.png';


const NewArrivals = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16 ">
      <Heading heading="Novos Produtos" />
      <Slider {...settings}>
        <div className="px-2">
          <Product
            _id="100001"
            img={imgplaca}
            productName="Placa Mae Duex DX H310ZG"
            price="429,00"
            badge={true}
            des="Placa Mae Duex DX H310ZG, DDR4, Soquet LGA1151, M-ATX, Chipset Intel H310, DX-H310ZG-WTH"
          />
        </div>
        <div className="px-2">
          <Product
            _id="100002"
            img={imgteclado}
            productName= "Teclado Mecanico"
            price="250.00"
            badge={true}
            des="Teclado Mecanico Gamer Motospeed SK84, Switch Azul, Amarelo, KG-SK84-YL-BL-WW"
          />
        </div>
        <div className="px-2">
          <Product
            _id="100003"
            img={imgmonitor}
            productName="Monitor Zinnia"
            price="80.00"
            color="Mixed"
            badge={true}
            des="Monitor Zinnia Pegasi Pro UW29, 29 Pol, IPS, Ultrawide, WFHD, sRGB 100, 100Hz, FreeSync, HDMI/DP, ZNO-PGSIPRO-BL01"
          />
        </div>
        <div className="px-2">
          <Product
            _id="100004"
            img={imggabinete}
            productName="PC Gamer Mancer Hermond"
            price="6.000"
            color="Mixed"
            badge={false}
            des="PC Gamer Mancer Hermond, AMD Ryzen 7 5800XT, GeForce RTX 2060 Super 8GB, 16GB DDR4, SSD 480GB"
          />
        </div>
        <div className="px-2">
          <Product
            _id="100005"
            img={imgps5}
            productName="Console Sony Playstation 5"
            price="3.959"
            color="Branco"
            badge={false}
            des="Console Sony Playstation 5, 1 Controle, Branco, PS5, CFI-1214A"
          />
        </div>
      </Slider>
    </div>
  );
};

export default NewArrivals;
