const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Obter todas as categorias
router.get('/', categoryController.findAll);

// Criar uma nova categoria
router.post('/', categoryController.create);

// Obter uma determinada categoria
router.get('/:id', categoryController.findOne);

//Atualizar uma determinada categoria
router.put('/:id', categoryController.update);

//Deletar uma determinada categoria
router.delete('/:id', categoryController.delete);

module.exports = router;