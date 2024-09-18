import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
} from "../../assets/images";
import Image from "../designLayouts/Image";

// Componente para o slide personalizado
const CustomSlide = ({ Subtext, imgSrc, text, buttonLink, buttonText }) => (
  <div
    className="bg-[#F5F5F3] flex flex-col md:flex-row justify-center items-center p-8"
    style={{
      position: "relative",
    }}
  >
    <div className="flex flex-col items-center md:items-start max-w-[450px] mb-6 md:mb-0 md:mr-[100px] text-center md:text-left">
      <h1 className="text-4xl font-bold text-black mb-4">{text}</h1>
      <p className="text-xl text-gray-600 mb-6">{Subtext}</p>
      <Link to={buttonLink}>
        <button className="bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold">
          {buttonText}
        </button>
      </Link>
    </div>
    <div className="md:ml-[100px]">
      <Image imgSrc={imgSrc} />
    </div>
  </div>
);

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "7%",
          transform: "translateY(-50%)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  const slides = [
    {
      imgSrc: bannerImgOne,
      text: "Aprimore o seu setup gamer",
      Subtext:
        "Encontre os melhores componentes para turbinar sua experiência tecnológica.",
      buttonLink: "/shop",
      buttonText: "Compre agora",
    },
    {
      imgSrc: bannerImgThree,
      text: "Home Office",
      Subtext:
        "Encontre os melhores componentes e acessórios para criar um espaço de trabalho eficiente e confortável em casa ou no escritório.",
      buttonLink: "/shop",
      buttonText: "Compre agora",
    },
    {
      imgSrc: bannerImgTwo,
      text: "Precisa de Ajuda?",
      Subtext:
        "Entre em contato e resolva suas dúvidas de forma rápida e fácil.",
      buttonLink: "/contact",
      buttonText: "Contate-nos",
    },

    // Adicione mais slides conforme necessário
  ];
  return (
    <div className="w-full bg-white">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
