// import { render, screen, fireEvent } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom"; // Para testar componentes com Link
// import SignIn from "./SignIn"; // O caminho para o seu componente

// test("verifica se o botão de login está desabilitado inicialmente", () => {
//   render(
//     <BrowserRouter>
//       <SignIn />
//     </BrowserRouter>
//   );

//   const loginButton = screen.getByRole("button", { name: /entrar/i });
//   expect(loginButton).toBeDisabled();
// });

// test("verifica se o botão de login habilita após preencher os campos", () => {
//   render(
//     <BrowserRouter>
//       <SignIn />
//     </BrowserRouter>
//   );

//   const emailInput = screen.getByPlaceholderText(/exemplo@dominio.com/i);
//   const passwordInput = screen.getByPlaceholderText(/123456/i);
//   const loginButton = screen.getByRole("button", { name: /entrar/i });

//   // Inicialmente, o botão deve estar desabilitado
//   expect(loginButton).toBeDisabled();

//   // Simular preenchimento dos campos
//   fireEvent.change(emailInput, { target: { value: "usuario@exemplo.com" } });
//   fireEvent.change(passwordInput, { target: { value: "senha123" } });

//   // Agora o botão deve estar habilitado
//   expect(loginButton).toBeEnabled();
// });
