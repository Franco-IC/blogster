const express = require('express');
const router = express.Router();
const auth = require('../auth_controller/auth');
const User = require('../db/models/User');

router.get('/login', (req, res) => {
    res.render('auth/login', { alert: false });
});

router.get('/register', (req, res) => {
    res.render('auth/register', { alert: false });
});

// Rutas de Autenticación
router.post('/register', (req, res, next) => {
    req.user = new User();
    next();
}, auth.register);

router.post('/login', auth.login);

router.get('/logout', auth.logout);

module.exports = router