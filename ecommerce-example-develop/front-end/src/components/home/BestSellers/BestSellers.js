import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import img1 from "./Ventoinha.png";
import img2 from "./FoneOuvi1.png";
import img3 from "./not.png";
import img4 from "./vr.png";

const BestSellers = () => {
  return (
    <div className="w-full pb-20">
      <Heading heading="Nossos mais vendidos" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        <Product
          _id="1011"
          img={img1}
          productName="Kit Ventoinhas Corsair"
          price="429.99"
          color="Branco"
          badge={true}
          des="Kit Ventoinhas Corsair Icue Link RX140 PWM, RGB, 2x140mm, Branco, CO-9051024-WW"
        />
        <Product
          _id="1012"
          img={img2}
          productName="one de Ouvido OneOdio"
          price="180.00"
          color="Preto"
          badge={false}
          des="Fone de Ouvido OneOdio Monitor 60, Preto, MONITOR60"
        />
        <Product
          _id="1013"
          img={img3}
          productName="Notebook Asus VivoBook"
          price="2599.99"
          color="Branco"
          badge={true}
          des="Notebook Asus VivoBook Go 15, 15.6 Pol, Intel I3-N305, FHD, TN, 4GB Ram, SSD 256GB, Cinza, E1504GA-NJ441W"
        />
        <Product
          _id="1014"
          img={img4}
          productName="Oculos de Realidade Virtual"
          price="6599.92"
          color="Branco"
          badge={false}
          des="Oculos de Realidade Virtual Oculus Quest 2, 256GB, Branco, 301-00409-02"
        />
      </div>
    </div>
  );
};

export default BestSellers;
