# Projeto TechNest

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![bcryptjs](https://img.shields.io/badge/bcryptjs-338833?style=flat&logo=npm&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF6600?style=flat&logo=npm&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=flat&logo=stripe&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=flat&logo=dotenv&logoColor=black)
![CORS](https://img.shields.io/badge/CORS-005571?style=flat&logo=npm&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Create React App](https://img.shields.io/badge/Create_React_App-09D3AC?style=flat&logo=createreactapp&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=reactrouter&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093?style=flat&logo=styledcomponents&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-007FFF?style=flat&logo=mui&logoColor=white)
![React Toastify](https://img.shields.io/badge/React_Toastify-FF4154?style=flat&logo=react&logoColor=white)
![react-paginate](https://img.shields.io/badge/react_paginate-61DAFB?style=flat&logo=react&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)
![Slick Carousel](https://img.shields.io/badge/Slick_Carousel-1D2C4E?style=flat&logo=npm&logoColor=white)
![Tailwind Scrollbar](https://img.shields.io/badge/Tailwind_Scrollbar-38B2AC?style=flat&logo=tailwindcss&logoColor=white)

Um marketplace / e-commerce fullstack construído com React no frontend e Node.js + Express no backend. O projeto inclui registro/login, perfil de usuário, catálogo de produtos, categorias, cadastro de endereços, upload de imagens de produtos e checkout via Stripe.

## Estrutura do projeto

- `ecommerce-example-develop/`
  - `back-end/` - API em Node.js, Express, Sequelize e MySQL
  - `front-end/` - Aplicação React criada com Create React App
  - `documentations/` - Documentos adicionais do projeto

## Principais funcionalidades

- Autenticação de usuário com JWT
- Cadastro e login de usuário
- Perfil de usuário com endereço
- Criação e listagem de produtos
- Criação, atualização e listagem de categorias
- Associação de produtos a categorias
- Upload de imagens de produto via `multer`
- Checkout com Stripe
- Rotas protegidas para carrinho e checkout
- Layout responsivo com React Router e componentes reutilizáveis

## Tecnologias

### Backend

- Node.js
- Express
- Sequelize
- MySQL
- bcryptjs
- jsonwebtoken
- multer
- Stripe
- dotenv
- cors

### Frontend

- React
- Create React App
- React Router DOM
- Redux Toolkit
- Axios
- Styled Components
- Material UI
- React Toastify
- react-paginate
- framer-motion
- slick-carousel
- tailwind-scrollbar

## Backend

### Localização

`ecommerce-example-develop/back-end`

### Instalação

1. Entre na pasta do backend:
   ```bash
   cd ecommerce-example-develop/back-end
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

### Variáveis de ambiente

Crie um arquivo `.env` na pasta `back-end` com as seguintes variáveis:

```env
DB_NAME=<nome_do_banco>
DB_USER=<usuario_mysql>
DB_PASSWORD=<senha_mysql>
DB_HOST=<host_mysql>
JWT_SECRET=<uma_chave_secreta>
STRIPE_KEY=<sua_chave_stripe_secret>
CLIENT_URL=http://localhost:3000
PORT=3000
```

> Observação: `CLIENT_URL` é usado para redirecionar após o checkout Stripe.

### Comandos úteis

- Iniciar o servidor:
  ```bash
  npm run start
  ```
- Iniciar o servidor em modo de desenvolvimento com nodemon:
  ```bash
  npm run dev
  ```

### Banco de dados

O backend usa Sequelize para conectar ao MySQL. Ele sincroniza os modelos automaticamente ao iniciar.

#### Seeders

Para rodar os seeders existentes:

```bash
npx sequelize-cli db:seed:all --seeders-path data/seeders/
```

### Rotas da API

#### Auth

- `POST /auth/register`
  - Corpo: `{ nome, email, telefone, password, logradouro, cidade, uf, pais, cep }`
- `POST /auth/login`
  - Corpo: `{ email, password }`
- `GET /auth/profile/:idUser`
- `PUT /auth/profile/:idUser`
  - Corpo: `{ nome, email, telefone, password?, logradouro?, cidade?, uf?, pais?, cep? }`

#### Produtos

- `GET /products/` - Lista todos os produtos com categorias
- `POST /products/` - Cria produto com upload de imagem
  - Campos esperados: `nome`, `unit_price`, `description`, `stock_quantity`, `categories`, `img`
  - Upload de imagem via `multipart/form-data` com campo `img`

#### Categorias

- `GET /categories/`
- `POST /categories/`
- `GET /categories/:id`
- `PUT /categories/:id`
- `DELETE /categories/:id`

#### Endereços

- `GET /enderecos/`
- `POST /enderecos/`

#### Stripe

- `POST /stripe/create-checkout-session`
  - Corpo: `{ cartItems }`
  - Cria sessão de checkout baseada nos itens do carrinho

## Frontend

### Localização

`ecommerce-example-develop/front-end`

### Instalação

1. Entre na pasta do frontend:
   ```bash
   cd ecommerce-example-develop/front-end
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

### Comandos úteis

- Iniciar em modo de desenvolvimento:
  ```bash
  npm start
  ```
- Criar build de produção:
  ```bash
  npm run build
  ```

### Configuração da API

O frontend usa `src/services/api.jsx` com a base:

```js
baseURL: 'http://localhost:3000/'
```

Se o backend estiver em outra porta, ajuste `baseURL` ou inicie o frontend em uma porta diferente:

```bash
set PORT=3001 && npm start
```

### Rotas principais do frontend

- `/` - Home
- `/shop` - Loja
- `/about` - Sobre
- `/contact` - Contato
- `/signin` - Login
- `/signup` - Cadastro
- `/profile` - Perfil de usuário
- `/cart` - Carrinho (rota protegida)
- `/paymentgateway` - Checkout Stripe (rota protegida)
- `/checkout-success` - Confirmação de compra (rota protegida)
- `/admin` - Painel de administração
- `/product/:_id` - Detalhes de produto

## Observações importantes

- O backend serve arquivos estáticos de imagens em `back-end/uploads`
- A autenticação adiciona token JWT no cabeçalho `Authorization: Bearer <token>` automaticamente via axios interceptor
- A rota Stripe depende de imagens hospedadas via URL local por padrão
- O frontend ainda mantém chamadas `http://localhost:3000` em alguns serviços específicos de registro, então é importante garantir que `backend` e `frontend` estejam configurados corretamente para a mesma origem ou ter as URLs atualizadas.

## Melhorias possíveis

- Ajustar separação de portas entre backend e frontend para evitar conflito em desenvolvimento
- Adicionar validações adicionais no backend e no frontend
- Criar rotas de exclusão e atualização de produto no frontend
- Implementar refresh token e medidas adicionais de segurança
- Adicionar testes automatizados para API e interface

## Como usar

1. Configurar o banco de dados MySQL
2. Definir variáveis de ambiente no backend
3. Rodar o backend
4. Rodar o frontend
5. Criar conta e testar cadastro/login, navegação, carrinho e checkout

---

Esse README documenta a estrutura e os principais pontos do projeto TechNest. Ajuste as variáveis e os caminhos de acordo com o seu ambiente local.
