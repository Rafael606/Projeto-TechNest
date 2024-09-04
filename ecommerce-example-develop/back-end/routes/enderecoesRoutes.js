const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');

router.post('/', enderecoController.create);
router.get('/', enderecoController.findAll);

module.exports = router;