const express = require('express');
const router = express.Router();
const auth = require('../auth_controller/auth');
const User = require('../db/models/User');

router.get('/login', (req, res) => {
    // Si el usuario tiene una sesión activa
    if (req.cookies.jwt) res.redirect('/home');
    else {
        res.render('auth/login', { alert: false });
    }
});

router.get('/register', (req, res) => {
    // Si el usuario tiene una sesión activa
    if (req.cookies.jwt) res.redirect('/home');
    else {
        res.render('auth/register', { alert: false });
    }
});

// Rutas de Autenticación

// Registro
router.post('/register', (req, res, next) => {
    req.user = new User();
    next();
}, auth.register);

// Login
router.post('/login', auth.login);

// Log out
router.get('/logout', auth.logout);

module.exports = router