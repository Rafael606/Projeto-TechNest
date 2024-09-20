// Importa as dependências e módulos 
const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const dotenv = require('dotenv'); 

// Importa as rotas
const authRoutes = require('./routes/authRoutes'); 
const enderecos = require('./routes/enderecoesRoutes'); 
const productRoutes = require('./routes/productRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes'); 
const stripe = require('./routes/stripe'); 

// Importa o modelo de dados
const db = require('./data/models');

// Carrega variáveis de ambiente
dotenv.config();

const app = express(); // Cria uma instância 

// Configura o middleware
app.use(cors()); // Habilita CORS
app.use(express.json()); // Parseia o corpo das requisições como JSON
app.use(express.urlencoded({ extended: true })); // Parseia o corpo das requisições URL-encoded
app.use('/uploads', express.static('uploads')); // Serve arquivos estáticos da pasta 'uploads'

// Configura as rotas
app.use('/auth', authRoutes);
app.use('/enderecos', enderecos); 
app.use('/products', productRoutes); 
app.use('/categories', categoryRoutes);
app.use('/stripe', stripe);

const PORT = process.env.PORT || 3000; 

// Sincroniza o banco de dados e inicia o servidor
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`); 
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar com o banco de dados:', error); 
  });
