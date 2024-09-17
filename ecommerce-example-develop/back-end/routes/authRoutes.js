const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
// const authMiddleware = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:idUser', getProfile);

module.exports = router;
