const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');

// Criar um novo endereço
router.post('/', enderecoController.create);

// Obter todos os endereços
router.get('/', enderecoController.findAll);

module.exports = router;