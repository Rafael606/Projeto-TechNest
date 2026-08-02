# Projeto TechNest

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
