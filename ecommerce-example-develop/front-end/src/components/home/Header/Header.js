import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logoLight } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const ResponsiveMenu = () => {
      setShowMenu(window.innerWidth >= 667);
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
    return () => window.removeEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <div className="w-full h-20 bg-black sticky top-0 z-50 border-b-[1px] border-gray-700">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <Image className="w-32 object-cover" imgSrc={logoLight} />
          </Link>
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4"
              >
                {navBarList.map(({ _id, title, link }) => (
                  <NavLink
                    key={_id}
                    to={link}
                    state={{ data: location.pathname.split("/")[1] }}
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-500 font-semibold text-base underline underline-offset-[4px] decoration-[1px]"
                        : "text-gray-300 font-normal text-base hover:font-semibold hover:text-white hover:underline underline-offset-[4px] decoration-[1px]"
                    }
                  >
                    <li>{title}</li>
                  </NavLink>
                ))}
              </motion.ul>
            )}
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4 text-gray-200"
            />
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-white bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative bg-red-950"
                >
                  <div className="w-full h-full p-6">
                    <img className="w-28 mb-6" src={logoLight} alt="logoLight" />
                    <ul className="flex flex-col gap-2">
                      {navBarList.map((item) => (
                        <li
                          key={item._id}
                          className={({ isActive }) =>
                            isActive
                              ? "text-red-500 font-semibold text-lg underline underline-offset-[4px] decoration-[1px]"
                              : "font-normal text-lg text-red-500 hover:font-semibold hover:text-white hover:underline underline-offset-[4px] decoration-[1px]"
                          }
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={() => setSidenav(false)}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <h1
                        onClick={() => setCategory(!category)}
                        className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
                      >
                        Categorias{" "}
                        <span className="text-lg">{category ? "-" : "+"}</span>
                      </h1>
                      {category && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-sm flex flex-col gap-1 text-gray-300"
                        >
                          <li className="hover:text-white">Novidades</li>
                          <li className="hover:text-white">Gadgets</li>
                          <li className="hover:text-white">Acessórios</li>
                          <li className="hover:text-white">Eletrônicos</li>
                          <li className="hover:text-white">Outros</li>
                        </motion.ul>
                      )}
                    </div>
                    <div className="mt-4">
                      <h1
                        onClick={() => setBrand(!brand)}
                        className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
                      >
                        Marcas
                        <span className="text-lg">{brand ? "-" : "+"}</span>
                      </h1>
                      {brand && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-sm flex flex-col gap-1 text-gray-300"
                        >
                          <li className="hover:text-white">Novidades</li>
                          <li className="hover:text-white">Gadgets</li>
                          <li className="hover:text-white">Acessórios</li>
                          <li className="hover:text-white">Eletrônicos</li>
                          <li className="hover:text-white">Outros</li>
                        </motion.ul>
                      )}
                    </div>
                  </div>
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
