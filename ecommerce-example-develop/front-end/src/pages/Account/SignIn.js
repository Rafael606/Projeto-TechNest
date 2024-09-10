import React, { useState, useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";  // Importar componentes do Material UI
import { useNavigate } from 'react-router-dom';
import { logoLight } from "../../assets/images";
import './SignIn.css';

import auth from "../../services/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [open, setOpen] = useState(false);  // Estado para controlar a exibição do alerta
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      let valid = true;

      // Validação do email
      if (!email) {
        setErrEmail("Digite seu e-mail");
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setErrEmail("Endereço de e-mail inválido");
        valid = false;
      }

      // Validação da senha
      if (!password) {
        setErrPassword("Digite sua senha");
        valid = false;
      } else if (password.length < 3) {
        setErrPassword("A senha deve ter pelo menos 3 caracteres");
        valid = false;
      }

      const response = await auth.login(email, password);
      
      const token = response.token;

      if (token){
        localStorage.setItem("token", token);
        navigate("/");
      }else {
        setErrPassword("Token não encontrado!");
      }

    } catch (error) {
      setErrPassword(`Erro ${error}`);
    }

  };

  const handleClose = () => {
    setOpen(false);  // Fechar o alerta
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redireciona para a rota desejada, como a home page
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center bg-black text-white px-6 md:px-10">
        <div className="w-full max-w-[320px] md:w-[320px] lg:w-[400px] h-full flex flex-col gap-6 md:gap-8 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-29 md:w-29" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-lg md:text-xl font-medium">
              Seja parte do TechNest
            </h1>
            <p className="text-sm md:text-base">Acesse benefícios exclusivos ao se registrar!</p>
          </div>
          <div className="w-full flex items-start gap-2 md:gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-sm md:text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Ofertas e descontos especiais
              </span>
              <br />
              Aproveite promoções e ofertas exclusivas ao fazer parte da nossa comunidade.
            </p>
          </div>
          <div className="w-full flex items-start gap-2 md:gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-sm md:text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Suporte técnico especializado
              </span>
              <br />
              Receba assistência personalizada para seus produtos e dúvidas técnicas.
            </p>
          </div>
          <div className="w-full flex items-start gap-2 md:gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-sm md:text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Notícias e atualizações
              </span>
              <br />
              Fique por dentro das últimas novidades e lançamentos diretamente no seu e-mail.
            </p>
          </div>
          <div className="flex items-center justify-between mt-8 md:mt-10">
            <Link to="/">
              <p className="text-xs md:text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © TechNest
              </p>
            </Link>
            <p className="text-xs md:text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Termos
            </p>
            <p className="text-xs md:text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacidade
            </p>
            <p className="text-xs md:text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Segurança
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 h-full bg-gradient-to-br from-red-950 via-red-900 to-white flex items-center justify-center p-6 md:p-10">
        {successMsg ? (
          <div className="w-full max-w-[500px] h-full flex flex-col justify-start mt-6 md:mt-10">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signup">
              <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Inscreva-se
              </button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSignIn} className="w-full max-w-[400px] h-auto flex items-center justify-center bg-white border border-gray-300 p-4 rounded-md">
            <div className="px-4 py-6 md:px-6 md:py-8 w-full h-full flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl md:text-3xl mb-4">
                Seja Bem-vindo(a)
              </h1>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                    E-mail
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="exemplo@dominio.com"
                  />
                  {errEmail && (
                    <p className="text-red-500 text-xs mt-1">
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                    Senha
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Digite sua senha"
                  />
                  {errPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
                >
                  Entrar
                </button>
                <p className="text-xs md:text-sm text-center font-titleFont font-medium">
                  Não tem uma conta?{" "}
                  <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Cadastre-se
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Alerta de Sucesso */}
      <Snackbar open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {successMsg}
        </Alert>
      </Snackbar>
    </div>
  );

};

export default SignIn;
