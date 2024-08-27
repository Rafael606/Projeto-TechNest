const db = require('../data/models');
const Product = db.Product;
const Category = db.Category;

// Criar um novo produto
exports.create = async (req, res) => {
  try {
    const { nome, unit_price, description, stock_quantity, categories } = req.body;
    const product = await Product.create({ nome, unit_price, description, stock_quantity });

    if (categories && categories.length > 0) {
      await product.setCategories(categories);
    }

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter todos os produtos
exports.findAll = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um produto por ID
exports.findOne = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um produto
exports.update = async (req, res) => {
  try {
    const { name, price, description, stock, categories } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await product.update({ name, price, description, stock });

    if (categories && categories.length > 0) {
      await product.setCategories(categories);
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Excluir um produto
exports.delete = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};