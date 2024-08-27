import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errCity, setErrCity] = useState("");
  const [errCountry, setErrCountry] = useState("");
  const [errZip, setErrZip] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClientName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setErrCity("");
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    setErrCountry("");
  };

  const handleZip = (e) => {
    setZip(e.target.value);
    setErrZip("");
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!clientName) {
      setErrClientName("Digite seu nome");
    }

    if (!email) {
      setErrEmail("Digite seu e-mail");
    }

    if (!phone) {
      setErrPhone("Digite seu número de telefone");
    }

    if (!password) {
      setErrPassword("Criar uma senha");
    }

    if (!address) {
      setErrAddress("Digite seu endereço");
    }

    if (!city) {
      setErrCity("Digite sua cidade");
    }

    if (!country) {
      setErrCountry("Insira seu país");
    }

    if (!zip) {
      setErrZip("Digite seu CEP");
    }

    if (clientName && email && phone && password && address && city && country && zip) {
      if (!checked) {
        alert("Você deve concordar com os termos e condições.");
        return;
      }
      setSuccessMsg(
        `Olá, obrigado por se cadastrar! Estamos processando suas informações e você receberá um e-mail de confirmação em ${email}.`
      );
      setClientName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAddress("");
      setCity("");
      setCountry("");
      setZip("");
      setChecked(false);
    }
  };

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
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Faça Login
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full max-w-[400px] h-auto flex items-center justify-center bg-white border border-gray-300 p-4 rounded-md">
            <div className="px-4 py-6 md:px-6 md:py-8 w-full h-full flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl md:text-3xl mb-4">
                Crie sua conta
              </h1>
              <div className="flex flex-col gap-3">
                {/* Nome */}
                <div className="flex flex-col gap-1">
                  <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                    Nome
                  </p>
                  <input
                    onChange={handleClientName}
                    value={clientName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Seu nome completo"
                  />
                  {errClientName && (
                    <p className="text-xs md:text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errClientName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="john@workemail.com"
                  />
                  {errEmail && (
                    <p className="text-xs md:text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Telefone */}
                <div className="flex flex-col gap-1">
                  <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                    Telefone
                  </p>
                  <input
                    onChange={handlePhone}
                    value={phone}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="number"
                    placeholder="(11) 12345-6789"
                  />
                  {errPhone && (
                    <p className="text-xs md:text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPhone}
                    </p>
                  )}
                </div>

               {/* Senha */}
               <div className="flex flex-col gap-1 relative">
      <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
        Senha
      </p>
      <input
        onChange={handlePassword}
        value={password}
        className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:font-normal rounded-md border border-gray-400 pr-10"
        type={showPassword ? "text" : "password"} 
        placeholder="Digite sua senha"
      />
      <span
        className="absolute top-1/2 right-2 mt-3 transform -translate-y-1/2 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <FaEye className="text-gray-600" />
        ) : (
          <FaEyeSlash className="text-gray-600" />
        )}
      </span>
      {errPassword && (
        <p className="text-xs md:text-sm text-red-500 font-titleFont font-semibold px-4">
          <span className="font-bold italic mr-1">!</span>
          {errPassword}
        </p>
      )}
    </div>

                {/* Endereço */}
                <div className="flex flex-col gap-1">
                  <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                    Endereço
                  </p>
                  <input
                    onChange={handleAddress}
                    value={address}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Rua Exemplo, 123"
                  />
                  {errAddress && (
                    <p className="text-xs md:text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errAddress}
                    </p>
                  )}
                </div>

                {/* Cidade */}
                <div className="flex flex-col gap-1">
                  <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                    Cidade
                  </p>
                  <input
                    onChange={handleCity}
                    value={city}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Cidade"
                  />
                  {errCity && (
                    <p className="text-xs md:text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errCity}
                    </p>
                  )}
                </div>

                {/* País */}
                <div className="flex flex-col gap-1">
                  <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                    País
                  </p>
                  <input
                    onChange={handleCountry}
                    value={country}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="País"
                  />
                  {errCountry && (
                    <p className="text-xs md:text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errCountry}
                    </p>
                  )}
                </div>

                {/* CEP */}
                <div className="flex flex-col gap-1">
                  <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                    CEP
                  </p>
                  <input
                    onChange={handleZip}
                    value={zip}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="number"
                    placeholder="12345-678"
                  />
                  {errZip && (
                    <p className="text-xs md:text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errZip}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    className="h-5 w-5"
                  />
                  <label className="text-sm md:text-base text-gray-600">
                    Concordo com os termos e condições
                  </label>
                </div>

                <button
                  onClick={handleSignUp}
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
                >
                  Cadastrar
                </button>
                <p className="text-xs md:text-sm text-center font-titleFont font-medium">
                  Já tem uma conta?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Faça login
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
