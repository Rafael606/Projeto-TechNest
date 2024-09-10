import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element }) => {
  const token = localStorage.getItem("token"); // Verifica se o token existe

  return token ? <Element /> : <Navigate to="/signin" />;
};

export default PrivateRoute;