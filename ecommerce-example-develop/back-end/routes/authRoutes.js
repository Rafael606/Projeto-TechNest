const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateUser } = require('../controllers/authController');
// const authMiddleware = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:idUser', getProfile);
router.put('/profile/:idUser', updateUser);

module.exports = router;
