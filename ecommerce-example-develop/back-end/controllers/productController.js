const db = require('../data/models');
const Product = db.Product;
const Category = db.Category;

// Criar um novo produto com upload de imagem
exports.create = async (req, res) => {
  try {
    const { nome, unit_price, description, stock_quantity } = req.body;
    let { categories } = req.body;

    // Verifique se "categories" é uma string (provavelmente ao testar via Postman)
    if (typeof categories === 'string') {
      categories = JSON.parse(categories); // Converta para array se for uma string
    }

    // Criação do produto
    const product = await Product.create({
      nome,
      unit_price,
      description,
      stock_quantity,
      img: req.file ? `/uploads/${req.file.filename}` : null // Armazenamento da imagem
    });

    // Verifique se "categories" é um array e contém IDs válidos
    if (categories && Array.isArray(categories) && categories.length > 0) {
      const existingCategories = await Category.findAll({
        where: { id: categories }
      });
      await product.setCategories(existingCategories.map(cat => cat.id));
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
      attributes: ['id', 'nome', 'description', 'unit_price', 'img', 'stock_quantity'],
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'nome'],
          through: { attributes: [] },
        },
      ],
    });

    console.log(products); // Verificar se o conteúdo está correto
    res.status(200).json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error); // Verifique o erro no console
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
          attributes: ['id', 'nome'],
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

exports.update = async (req, res) => {
  try {
    const { nome, unit_price, description, stock_quantity, categories } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Atualiza os dados do produto
    await product.update({ nome, unit_price, description, stock_quantity });

    // Atualiza as categorias associadas
    if (categories && Array.isArray(categories)) {
      await product.setCategories(categories); // Atualiza as categorias associadas
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