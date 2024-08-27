const express = require('express');
//const { authenticateToken, authorizeRole } = require('../middlewares/auth');
const products = require('../controllers/productController');
const router = express.Router();

// Criar um novo produto
router.post('/', products.create);
//router.post('/', [authenticateToken, authorizeRole(['admin'])], products.create);

// Obter todos os produtos
router.get('/', products.findAll);

// Obter um produto por ID
router.get('/:id', products.findOne);

// Atualizar um produto por ID
//router.put('/:id', [authenticateToken, authorizeRole(['admin'])], products.update);

// Excluir um produto por ID
//router.delete('/:id', [authenticateToken, authorizeRole(['admin'])], products.delete);

module.exports = router;
