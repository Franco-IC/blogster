const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const User = require("../db/models/User");
require("dotenv").config();

// Registro
exports.register = async (req, res) => {
  let user = req.user;
  let passHash = await bcrypt.hash(req.body.password.trim(), 8);
  user.name = req.body.name.trim();
  user.user = req.body.user.trim();
  user.pass = passHash;
  try {
    if (!user || !req.body.password.trim() || !req.body.name.trim()) {
      res.render("auth/register", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Uno o más campos se encuentran vacíos.",
        alertIcon: "info",
        showConfirmButton: true,
        ruta: "register",
      });
    } else {
      user = await user.save();
      res.render("auth/register", {
        alert: true,
        alertTitle: "Registro exitoso",
        alertMessage: "Te registraste con éxito, redirigiéndote al login...",
        alertIcon: "success",
        showConfirmButton: "",
        ruta: "login",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.render("auth/register", {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Ya existe un usuario con ese nombre, usa otro por favor.",
      alertIcon: "error",
      showConfirmButton: "true",
      ruta: "register",
    });
  }
};

// Login
exports.login = async (req, res) => {
  console.log("intento de login", req.body);
  try {
    const username = req.body.user.trim();
    const pass = req.body.password.trim();

    if (!username || !pass) {
      res.render("auth/login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingresa un usuario y contraseña.",
        alertIcon: "info",
        showConfirmButton: true,
        ruta: "login",
      });
    } else {
      const usuario = await User.findOne({ user: username });
      let pw;
      if (usuario !== null) {
        pw = await bcrypt.compare(pass, usuario.pass);
      }

      if (usuario === null || pw === false) {
        // Falló el login
        res.render("auth/login", {
          alert: true,
          alertTitle: "Error",
          alertMessage: "Usuario y/o contraseña incorrectos.",
          alertIcon: "error",
          showConfirmButton: "false",
          ruta: "login",
        });
      } else {
        // Login con éxito
        const id = usuario._id;

        // Token de JWT (sin fecha de expiración: jwt.sign({ id: id }, process.env.JWT_KEY)
        const token = jwt.sign({ id: id }, process.env.JWT_KEY, {
          expiresIn: process.env.JWT_EXPIRES,
        });
        console.log(`Token ${token} para el user ${username}`);

        // Opciones de cookie para JWT
        const cookieOpts = {
          // Expira en 3 meses
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };

        // Se guarda el token JWT
        res.cookie("jwt", token, cookieOpts);

        // Alert de login exitoso y se redirige a la Home Page
        res.render("auth/login", {
          alert: true,
          alertTitle: "Inicio de sesión exitoso.",
          alertMessage: `Bienvenido ${username}`,
          alertIcon: "success",
          showConfirmButton: "",
          ruta: "home",
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Validación de Autenticación X Token de JWT
exports.isAuth = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // cookie decoficicada
      const deco = await promisify(
        jwt.verify(req.cookies.jwt, process.env.JWT_KEY)
      );
      usuario = await User.findById(deco.id);

      if (!usuario) return next();

      req.user = usuario;
      return next();
    } catch (e) {
      console.log(e.message);
      return next();
    }
  } else {
    res.redirect("login");
  }
};

// Log Out
exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("login");
};
