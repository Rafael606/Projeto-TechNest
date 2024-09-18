const express = require('express');
const router = express.Router();
const products = require('../controllers/productController');

// Criar um novo produto
router.post('/', products.create);

// Obter todos os produtos
router.get('/', products.findAll);

module.exports = router;
