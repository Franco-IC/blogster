const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth_controller");
const User = require("../db/models/User");

router.get("/login", (req, res) => {
  // Si el usuario tiene una sesión activa (o sea, está logeado)
  if (req.cookies.jwt) return res.redirect("/home");
  else {
    res.render("auth/login", { alert: false });
  }
});

router.get("/register", (req, res) => {
  // Si el usuario tiene una sesión activa
  if (req.cookies.jwt) res.redirect("/home");
  else {
    res.render("auth/register", { alert: false });
  }
});

// Rutas de Autenticación

// Registro
router.post(
  "/register",
  (req, res, next) => {
    req.user = new User();
    next();
  },
  auth.register
);

// Log in
router.post("/login", auth.login);

// Log out
router.get("/logout", auth.logout);

module.exports = router;
