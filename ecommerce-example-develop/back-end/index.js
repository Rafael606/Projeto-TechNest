const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Rotas
const authRoutes = require('./routes/authRoutes');
const enderecos = require('./routes/enderecoesRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const stripe = require('./routes/stripe');

// Modelos
const db = require('./data/models');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/enderecos', enderecos);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/stripe', stripe);

const PORT = process.env.PORT || 3000;

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar com o banco de dados:', error);
  });