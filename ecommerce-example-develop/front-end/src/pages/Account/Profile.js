import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import auth from "../../services/auth"; // Certifique-se de que o serviço auth esteja configurado
import UserFromToken from "../../utils/UserFromToken";

const ProfilePage = () => {
    // Estados para armazenar os dados do perfil e para controle do estado do Snackbar
    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");
    const [currentPassword, setCurrentPassword] = useState(""); // Senha atual
    const [newPassword, setNewPassword] = useState(""); // Nova senha
    const [showPassword, setShowPassword] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const navigate = useNavigate(); // Hook para navegação entre rotas

    useEffect(() => {
        const user = UserFromToken();
        // Carregar dados do usuário ao montar o componente
        auth.getProfile(user.id).then(profile => {
            // Atualiza os estados com os dados do perfil
            setClientName(profile.nome);
            setEmail(profile.email);
            setPhone(profile.telefone);
            setAddress(profile.logradouro);
            setCity(profile.cidade);
            setState(profile.uf);
            setCountry(profile.pais);
            setZip(profile.cep);
        }).catch(error => {
            // Lidar com erros de carregamento
            console.error("Erro ao carregar o perfil do usuário:", error);
        });
    }, []); // Dependência vazia, o useEffect será executado apenas uma vez ao montar o componente

    const handleSave = (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário

        // Lógica para salvar os dados do perfil
        const profileUpdate = {
            name: clientName,
            email,
            phone,
            address,
            city,
            state,
            country,
            zip,
            currentPassword, // Adicione a senha atual
            newPassword // Adicione a nova senha
        };

        auth.updateUserProfile(profileUpdate)
            .then(() => {
                // Atualiza o estado do Snackbar com uma mensagem de sucesso
                setSnackbarMessage("Perfil atualizado com sucesso!");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);
            })
            .catch(error => {
                // Atualiza o estado do Snackbar com uma mensagem de erro
                setSnackbarMessage("Erro ao atualizar o perfil.");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); // Fecha o Snackbar
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-red-950 via-red-900 to-white p-6 md:p-10">
            <div className="w-full max-w-[600px] h-auto flex flex-col bg-white border border-gray-300 p-4 rounded-md">
                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl md:text-3xl mb-4">
                    Meu Perfil
                </h1>
                <form className="flex flex-col gap-4" onSubmit={handleSave}>
                    <div className="flex flex-col gap-3">
                        {/* Nome & Email */}
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 w-1/2">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    Nome
                                </p>
                                <input
                                    onChange={(e) => setClientName(e.target.value)}
                                    value={clientName}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite seu nome"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-1/2">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    E-mail
                                </p>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite seu e-mail"
                                />
                            </div>
                        </div>

                        {/* Telefone & Senha */}
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 w-1/2">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    Telefone
                                </p>
                                <input
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite seu telefone"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    Nova Senha
                                </p>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        value={newPassword}
                                        className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                        placeholder="Digite sua nova senha"
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Endereço & Cidade */}
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 w-1/2">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    Endereço
                                </p>
                                <input
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite seu endereço"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-1/2">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    Cidade
                                </p>
                                <input
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite sua cidade"
                                />
                            </div>
                        </div>

                        {/* Estado & País */}
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 w-1/2">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    Estado
                                </p>
                                <input
                                    onChange={(e) => setState(e.target.value)}
                                    value={state}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite seu estado"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-1/2">
                                <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                    País
                                </p>
                                <input
                                    onChange={(e) => setCountry(e.target.value)}
                                    value={country}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                    placeholder="Digite seu país"
                                />
                            </div>
                        </div>

                        {/* CEP */}
                        <div className="flex flex-col gap-1 w-full">
                            <p className="font-titleFont text-sm md:text-base font-semibold text-gray-600">
                                CEP
                            </p>
                            <input
                                onChange={(e) => setZip(e.target.value)}
                                value={zip}
                                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-sm md:text-base font-medium placeholder:text-gray-400 border border-gray-300 rounded-md outline-none focus:outline-primeColor"
                                placeholder="Digite seu CEP"
                            />
                        </div>
                    </div>

                    {/* Botão de Salvar */}
                    <button
                        type="submit"
                        className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300"
                    >
                        Atualizar Dados
                    </button>
                </form>
            </div>

            {/* Snackbar para exibir alertas */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Duração que o Snackbar ficará visível
                onClose={handleCloseSnackbar}
                action={
                    <button onClick={handleCloseSnackbar} className="text-white">X</button>
                }
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity} // Tipo de alerta (sucesso ou erro)
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage} {/* Mensagem do alerta */}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ProfilePage;
