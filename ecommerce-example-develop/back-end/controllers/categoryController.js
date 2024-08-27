const db = require('../data/models');
const Category = db.Category;

// Criar uma nova categoria
exports.create = async (req, res) => {
  try {
    const { nome, parentId } = req.body;
    const category = await Category.create({ nome, parentId });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter todas as categorias
exports.findAll = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Category, as: 'subcategories' }]
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter uma categoria por ID
exports.findOne = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Category, as: 'subcategories' }]
    });
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar uma categoria
exports.update = async (req, res) => {
  try {
    const [num] = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (num === 1) {
      res.json({ message: 'Categoria atualizada com sucesso.' });
    } else {
      res.status(404).json({ error: 'Categoria não encontrada ou dados inalterados.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma categoria
exports.delete = async (req, res) => {
  try {
    const num = await Category.destroy({
      where: { id: req.params.id }
    });
    if (num === 1) {
      res.json({ message: 'Categoria excluída com sucesso.' });
    } else {
      res.status(404).json({ error: 'Categoria não encontrada.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
