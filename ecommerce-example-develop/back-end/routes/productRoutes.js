const express = require('express');
const router = express.Router();
const products = require('../controllers/productController');
const upload = require('../config/multerConfig');

// Criar um novo produto
router.post('/', upload.single('img'), products.create);

// Obter todos os produtos
router.get('/', products.findAll);

module.exports = router;
