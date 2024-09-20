import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import auth from "../../services/auth";
import UserFromToken from "../../utils/UserFromToken";
import axios from 'axios';

const ProfilePage = () => {
    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [errClientName, setErrClientName] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPhone, setErrPhone] = useState("");
    const [errAddress, setErrAddress] = useState("");
    const [errCity, setErrCity] = useState("");
    const [errState, setErrState] = useState("");
    const [errCountry, setErrCountry] = useState("");
    const [errZip, setErrZip] = useState("");
    const [errNewPassword, setErrNewPassword] = useState("");

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verifica se o usuário está logado e carrega os dados do perfil
        const userFromToken = UserFromToken();
        if (userFromToken && userFromToken.id) {
            setUser(userFromToken);
            auth.getProfile(userFromToken.id).then(profile => {
                setClientName(profile.nome);
                setEmail(profile.email);
                setPhone(profile.telefone);
                setAddress(profile.logradouro);
                setCity(profile.cidade);
                setState(profile.uf);
                setCountry(profile.pais);
                setZip(profile.cep);
            }).catch(error => {
                console.error("Erro ao carregar o perfil do usuário:", error);
            });
        } else {
            navigate("/signin"); // Redireciona para a página de login se o usuário não estiver logado
        }
    }, [navigate]);

    const handleSave = (e) => {
        e.preventDefault();

        if (errClientName || errEmail || errPhone || errAddress || errCity || errState || errCountry || errZip || errNewPassword) {
            setSnackbarMessage("Por favor, corrija os erros no formulário.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        if (user && user.id) {
            const profileUpdate = {
                nome: clientName,
                email: email,
                telefone: phone,
                logradouro: address,
                cidade: city,
                uf: state,
                pais: country,
                cep: zip
            };

            if (newPassword) {
                profileUpdate.password = newPassword;
            }

            auth.updateProfile(user.id, profileUpdate)
                .then(() => {
                    setSnackbarMessage("Perfil atualizado com sucesso!");
                    setSnackbarSeverity("success");
                    setOpenSnackbar(true);
                })
                .catch(error => {
                    setSnackbarMessage("Erro ao atualizar o perfil.");
                    setSnackbarSeverity("error");
                    setOpenSnackbar(true);
                });
        } else {
            setSnackbarMessage("Usuário não encontrado.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleZipChange = async (e) => {
        const newZip = e.target.value;
        setZip(newZip);

        if (newZip.length <= 8) {
            setErrZip("");

            if (newZip.length === 8) {
                if (/^\d{8}$/.test(newZip)) {
                    try {
                        const response = await axios.get(`https://viacep.com.br/ws/${newZip}/json/`);
                        const data = response.data;

                        if (!data.erro) {
                            setAddress(data.logradouro || "");
                            setCity(data.localidade || "");
                            setState(data.uf || "");
                            setCountry("Brasil");
                        } else {
                            setErrZip("CEP não encontrado.");
                            setSnackbarMessage("CEP não encontrado.");
                            setSnackbarSeverity("error");
                            setOpenSnackbar(true);
                        }
                    } catch (error) {
                        setErrZip("Erro ao buscar o CEP.");
                        setSnackbarMessage("Erro ao buscar o CEP.");
                        setSnackbarSeverity("error");
                        setOpenSnackbar(true);
                    }
                } else {
                    setErrZip("CEP inválido. Deve conter apenas números.");
                }
            }
        } else {
            setErrZip("CEP deve ter no máximo 8 dígitos.");
        }
    };

    const handlePhoneChange = (e) => {
        let phoneNumber = e.target.value;
        phoneNumber = phoneNumber.replace(/\D/g, '');
        if (phoneNumber.length > 11) {
            phoneNumber = phoneNumber.slice(0, 11);
        }
        setPhone(phoneNumber);
        if (phoneNumber.length < 8) {
            setErrPhone("O telefone deve ter pelo menos 8 dígitos.");
        } else {
            setErrPhone("");
        }
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        let error = "";

        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            error = `A senha deve ter pelo menos ${minLength} caracteres.`;
        } else if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            error = "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais.";
        }

        setNewPassword(password);
        setErrNewPassword(error);
    };

    const handleGoBack = () => {
        navigate("/");
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-red-950 via-red-900 to-white p-6 md:p-10 relative">
            <div className="w-full max-w-[600px] h-auto flex flex-col bg-white border border-gray-300 p-4 rounded-md">
                <button
                    onClick={handleGoBack}
                    className="left-4 top-4 text-black hover:text-primeColor"
                >
                    &#8592; Voltar
                </button>
                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl md:text-3xl mb-4 text-center">
                    Meu Perfil
                </h1>
                <form className="flex flex-col gap-4" onSubmit={handleSave}>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 w-1/2">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    Nome
                                </p>
                                <input
                                    onChange={(e) => {
                                        setClientName(e.target.value);
                                        setErrClientName("");
                                    }}
                                    value={clientName}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite seu nome"
                                />
                                {errClientName && <p className="text-red-500 text-xs">{errClientName}</p>}
                            </div>
                            <div className="flex flex-col gap-1 w-1/2">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    Email
                                </p>
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrEmail("");
                                    }}
                                    value={email}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite seu e-mail"
                                    type="email"
                                />
                                {errEmail && <p className="text-red-500 text-xs">{errEmail}</p>}
                            </div>
                        </div>

                        {/* Telefone */}
                        <div className="flex flex-col gap-1">
                            <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                Telefone
                            </p>
                            <input
                                onChange={handlePhoneChange}
                                value={phone}
                                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                placeholder="Digite seu telefone"
                                type="tel"
                            />
                            {errPhone && <p className="text-red-500 text-xs">{errPhone}</p>}
                        </div>

                        {/* Endereço */}
                        <div className="flex flex-col gap-1">
                            <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                Endereço
                            </p>
                            <input
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                    setErrAddress("");
                                }}
                                value={address}
                                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                placeholder="Digite seu endereço"
                            />
                            {errAddress && <p className="text-red-500 text-xs">{errAddress}</p>}
                        </div>

                        {/* Cidade, Estado, País e CEP */}
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 w-1/2">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    Cidade
                                </p>
                                <input
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                        setErrCity("");
                                    }}
                                    value={city}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite sua cidade"
                                />
                                {errCity && <p className="text-red-500 text-xs">{errCity}</p>}
                            </div>
                            <div className="flex flex-col gap-1 w-1/2">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    Estado
                                </p>
                                <input
                                    onChange={(e) => {
                                        setState(e.target.value);
                                        setErrState("");
                                    }}
                                    value={state}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite seu estado"
                                />
                                {errState && <p className="text-red-500 text-xs">{errState}</p>}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 w-1/2">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    País
                                </p>
                                <input
                                    onChange={(e) => {
                                        setCountry(e.target.value);
                                        setErrCountry("");
                                    }}
                                    value={country}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite seu país"
                                />
                                {errCountry && <p className="text-red-500 text-xs">{errCountry}</p>}
                            </div>
                            <div className="flex flex-col gap-1 w-1/2">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    CEP
                                </p>
                                <input
                                    onChange={handleZipChange}
                                    value={zip}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite seu CEP"
                                    type="text"
                                />
                                {errZip && <p className="text-red-500 text-xs">{errZip}</p>}
                            </div>
                        </div>

                        {/* Senha */}
                        <div className="flex flex-col gap-1">
                            <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                Nova Senha
                            </p>
                            <div className="relative">
                                <input
                                    onChange={handlePasswordChange}
                                    value={newPassword}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite uma nova senha"
                                    type={showPassword ? "text" : "password"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errNewPassword && <p className="text-red-500 text-xs">{errNewPassword}</p>}
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-primeColor text-white px-6 py-2 rounded-md hover:bg-primeColor-dark"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ProfilePage;
