const db = require('../data/models');
const Enderecos = db.Endereco;

// Criar uma nova categoria
exports.create = async (req, res) => {
  try {
    const { logradouro, cidade, uf, pais, cep, userId } = req.body;
    const endereco = await Enderecos.create({ logradouro, cidade, uf, pais, cep, userId });

    res.status(201).json(endereco);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter todas as categorias
exports.findAll = async (req, res) => {
  try {
    const enderecos = await Enderecos.findAll();
    res.json(enderecos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};