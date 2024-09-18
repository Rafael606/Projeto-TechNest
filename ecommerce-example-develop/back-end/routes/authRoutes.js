const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//Registar um usuário
router.post('/register', authController.register);

//Realizar login de um usuário
router.post('/login', authController.login);

//Obter dados de um usuário
router.get('/profile/:idUser', authController.getProfile);

//Atualizar dados de um usuário
router.put('/profile/:idUser', authController.updateUser);

module.exports = router;
