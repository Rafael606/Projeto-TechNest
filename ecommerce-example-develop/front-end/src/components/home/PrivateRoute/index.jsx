import React from "react";
import { Navigate } from "react-router-dom";

// Componente para proteger rotas privadas
const PrivateRoute = ({ element: Element }) => {
  // Recupera o token de autenticação do localStorage
  const token = localStorage.getItem("token");
  console.log("token", token); // Exibe o token no console para depuração

  // Verifica se o token existe
  // Se o token estiver presente, renderiza o componente passado como prop (Element)
  // Se o token não estiver presente, redireciona o usuário para a página de login (/signin)
  return token ? <Element /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
