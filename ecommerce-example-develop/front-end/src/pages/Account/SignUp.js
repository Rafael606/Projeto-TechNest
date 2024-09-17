import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import auth from "../../services/auth";

const SignUp = () => {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errCity, setErrCity] = useState("");
  const [errState, setErrState] = useState("");
  const [errCountry, setErrCountry] = useState("");
  const [errZip, setErrZip] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const fetchAddressByZip = async (zipCode) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;
      setAddress(logradouro);
      setCity(localidade);
      setState(uf);
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
      setErrZip("Erro ao buscar o endereço. Verifique o CEP.");
    }
  };


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

  const handleState = (e) => {
    setState(e.target.value);
    setErrState("");
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    setErrCountry("");
  };

  const handleZip = (e) => {
    const zipCode = e.target.value;

    // Limitar a entrada a 8 dígitos
    if (zipCode.length <= 8) {
      setZip(zipCode);
      setErrZip("");

      // Validar se o CEP tem exatamente 8 dígitos
      if (zipCode.length === 8) {
        // Aqui você pode adicionar mais validações se necessário
        if (/^\d{8}$/.test(zipCode)) {
          fetchAddressByZip(zipCode);
        } else {
          setErrZip("CEP inválido. Deve conter apenas números.");
        }
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validação local
    if (!clientName) setErrClientName("Digite seu nome");
    if (!email) setErrEmail("Digite seu e-mail");
    if (!phone) setErrPhone("Digite seu número de telefone");
    if (!password) setErrPassword("Crie uma senha");
    if (!address) setErrAddress("Digite seu endereço");
    if (!city) setErrCity("Digite sua cidade");
    if (!state) setErrState("Digite seu estado");
    if (!country) setErrCountry("Insira seu país");
    if (!zip) setErrZip("Digite seu CEP");

    // Verificação final
    if (clientName && email && phone && password && address && city && state && country && zip) {
      if (!checked) {
        alert("Você deve concordar com os termos e condições.");
        return;
      }

      const user = {
        nome: clientName,
        email: email,
        telefone: phone,
        password: password,
        logradouro: address,
        cidade: city,
        uf: state,
        pais: country,
        cep: zip
      };

      try {
        await auth.register(user);
        setSuccessMsg(
          `Olá, obrigado por se cadastrar! Um e-mail de confirmação será enviado para ${email}.`
        );
        setSnackbarMessage("Cadastro realizado com sucesso!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        navigate("/signin");  // Navega para a página de signin após sucesso

        // Resetar os campos
        setClientName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setAddress("");
        setCity("");
        setCountry("");
        setZip("");
        setState("");
        setChecked(false);
      } catch (e) {
        // Exibe uma mensagem de erro mais amigável no Snackbar
        console.log("e", e);
        const errorMessage = e.response?.data?.message || 'Ocorreu um erro ao tentar registrar.';
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          <form className="w-full max-w-[600px] h-auto flex flex-col bg-white border border-gray-300 p-4 rounded-md">
            <div className="px-4 py-6 md:px-6 md:py-8 w-full h-full flex flex-col gap-4">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl md:text-3xl mb-4">
                Crie sua conta
              </h1>
              <div className="flex flex-col gap-3">
                {/* Nome & Email */}
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-1/2">
                    <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                      Nome
                    </p>
                    <input
                      onChange={handleClientName}
                      value={clientName}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                      placeholder="Digite seu nome"
                    />
                    {errClientName && (
                      <p className="text-red-500 text-xs mt-1">{errClientName}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                      E-mail
                    </p>
                    <input
                      onChange={handleEmail}
                      value={email}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                      placeholder="Digite seu e-mail"
                    />
                    {errEmail && (
                      <p className="text-red-500 text-xs mt-1">{errEmail}</p>
                    )}
                  </div>
                </div>

                {/* Telefone & Senha */}
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-1/2">
                    <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                      Telefone
                    </p>
                    <input
                      onChange={handlePhone}
                      value={phone}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                      placeholder="Digite seu telefone"
                    />
                    {errPhone && (
                      <p className="text-red-500 text-xs mt-1">{errPhone}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                      Senha
                    </p>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        onChange={handlePassword}
                        value={password}
                        className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                        placeholder="Digite sua senha"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {errPassword && (
                      <p className="text-red-500 text-xs mt-1">{errPassword}</p>
                    )}
                  </div>
                </div>

                {/* Endereço & Cidade */}
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-1/2">
                    <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                      Endereço
                    </p>
                    <input
                      onChange={handleAddress}
                      value={address}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                      placeholder="Digite seu endereço"
                    />
                    {errAddress && (
                      <p className="text-red-500 text-xs mt-1">{errAddress}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                      Cidade
                    </p>
                    <input
                      onChange={handleCity}
                      value={city}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                      placeholder="Digite sua cidade"
                    />
                    {errCity && (
                      <p className="text-red-500 text-xs mt-1">{errCity}</p>
                    )}
                  </div>
                </div>

                {/* Estado & País */}
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-1/2">
                    <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                      Estado
                    </p>
                    <input
                      onChange={handleState}
                      value={state}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                      placeholder="Digite seu estado"
                    />
                    {errState && (
                      <p className="text-red-500 text-xs mt-1">{errState}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                      País
                    </p>
                    <input
                      onChange={handleCountry}
                      value={country}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                      placeholder="Digite seu país"
                    />
                    {errCountry && (
                      <p className="text-red-500 text-xs mt-1">{errCountry}</p>
                    )}
                  </div>
                </div>

                {/* CEP */}
                <div className="flex flex-col gap-1 w-full">
                  <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                    CEP
                  </p>
                  <input
                    onChange={handleZip}
                    value={zip}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                    placeholder="Digite seu CEP"
                  />
                  {errZip && (
                    <p className="text-red-500 text-xs mt-1">{errZip}</p>
                  )}
                </div>

                {/* Termos e Condições */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    className="w-5 h-5 border border-gray-300 rounded-md cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm md:text-base font-medium text-gray-600 cursor-pointer"
                  >
                    Eu concordo com os{" "}
                    <span className="text-primeColor">termos e condições</span>
                  </label>
                </div>

                <button
                  onClick={handleSignUp}
                  className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300"
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
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUp;
