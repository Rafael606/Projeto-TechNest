const express = require('express');
const router = express.Router();
const products = require('../controllers/productController');
const upload = require('../config/multerConfig');

// Criar um novo produto
router.post('/', upload.single('img'), products.create);

// Obter todos os produtos
router.get('/', products.findAll);

// Obter um único produto pelo ID
// router.get('/:id', products.findOne);

// // Atualizar um produto pelo ID
// router.put('/:id', upload.single('img'), products.update);

// // Excluir um produto pelo ID
// router.delete('/:id', products.delete);

module.exports = router;
