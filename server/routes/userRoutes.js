const express = require('express');
const { register, login, refresh, logout, deleteUser, getMe } = require('../controllers/userControllers');
const protect = require('../middlewares/auth');
const router = express.Router();

// router.get('/test', root);
router.post('/register', register);
router.post('/login', login);
router.get('/getMe', protect, getMe);
router.get('/refresh', refresh);
router.post('/logout', logout);
router.delete('/deleteUser/:id', protect, deleteUser);

module.exports = router