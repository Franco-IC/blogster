const express = require("express");
const Article = require("../db/models/Article");
const router = express.Router();
const auth = require("../controllers/auth_controller");
const methodOverride = require("method-override");
router.use(methodOverride("_method"));

// Busqueda X Título
router.get("/search", auth.isAuth, async (req, res) => {
  titulo = req.query.searchVal.trim();
  let article;

  if (titulo.length === 0) {
    article = null;
  } else {
    article = await Article.findOne({
      title: { $regex: titulo, $options: "i" },
    });
  }

  if (article === null) {
    res.render("articles/not-found", { user: req.user });
  } else {
    res.render("articles/show-article", { article: article, user: req.user });
  }
});

// Render form para Articulo nuevo
router.get("/new-post/", auth.isAuth, (req, res) => {
  res.render("articles/new-post", {
    article: new Article(),
    alert: false,
    user: req.user,
  });
});

// Creación del Articulo
router.post(
  "/",
  auth.isAuth,
  async (req, res, next) => {
    req.article = new Article();
    req.username = req.user.user;
    next();
  },
  saveArticleAndRedirect("new-post", false)
);

// Obtener Articulo con Slug aplicado
router.get("/:slug", auth.isAuth, async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/show-article", { article: article, user: req.user });
});

// Ruta para renderizar el Articulo a Editar
router.get("/edit/:id", auth.isAuth, async (req, res) => {
  const article = await Article.findById({ _id: req.params.id });
  res.render("articles/edit-post", {
    article: article,
    alert: false,
    user: req.user,
  });
});

// Editar Articulo x ID
router.put(
  "/edit/:id",
  auth.isAuth,
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit-post", true)
);

// Eliminar Articulo x ID
router.delete("/edit/:id", auth.isAuth, async (req, res) => {
  req.article = await Article.deleteOne({ _id: req.params.id });
  res.redirect("/");
});

// Guardar Articulo y Redireccionar
function saveArticleAndRedirect(path, modified) {
  return async (req, res) => {
    let article = req.article;
    if (modified) {
      article.title = req.body.title.trim();
      article.description = req.body.description.trim();
      article.markdown = req.body.markdown.trim();
      article.modifiedAt = Date.now();
    } else {
      article.author = req.username;
      article.title = req.body.title.trim();
      article.description = req.body.description.trim();
      article.markdown = req.body.markdown.trim();
    }
    try {
      article = await article.save();
      if (modified) {
        res.render(`articles/${path}`, {
          article: article,
          user: req.user,
          // Opciones de Alert
          alert: true,
          alertTitle: "Post editado con éxito.",
          alertMessage: "Redirigiéndote a tu post...",
          alertIcon: "success",
          showConfirmButton: "",
          ruta: `/articles/${article.slug}`,
        });
      } else {
        res.render(`articles/${path}`, {
          article: article,
          user: req.user,
          // Opciones de Alert
          alert: true,
          alertTitle: "Post realizado con éxito.",
          alertMessage: "Redirigiéndote a tu post...",
          alertIcon: "success",
          showConfirmButton: "",
          ruta: `articles/${article.slug}`,
        });
      }
    } catch (e) {
      console.log(e.message);
      // Codigo de error para titulo duplicado 11000
      if (e.code === 11000) {
        if (modified) {
          res.render(`articles/${path}`, {
            article: article,
            user: req.user,
            // Opciones de Alert
            alert: true,
            article: article,
            alertTitle: "Error",
            alertMessage: "Ya existe un post con ese título.",
            alertIcon: "error",
            showConfirmButton: "true",
            ruta: `${article._id}`,
          });
        } else {
          res.render(`articles/${path}`, {
            article: article,
            user: req.user,
            // Opciones de Alert
            alert: true,
            article: article,
            alertTitle: "Error",
            alertMessage: "Ya existe un post con ese título.",
            alertIcon: "error",
            showConfirmButton: "true",
            ruta: `articles/${path}`,
          });
        }
      } else {
        if (modified) {
          res.render(`articles/${path}`, {
            article: article,
            user: req.user,
            // Opciones de Alert
            alert: true,
            article: article,
            alertTitle: "Error",
            alertMessage: "Uno o más campos están vacíos.",
            alertIcon: "error",
            showConfirmButton: "true",
            ruta: `${article._id}`,
          });
        } else {
          res.render(`articles/${path}`, {
            article: article,
            user: req.user,
            // Opciones de Alert
            alert: true,
            article: article,
            alertTitle: "Error",
            alertMessage: "Uno o más campos están vacíos.",
            alertIcon: "error",
            showConfirmButton: "true",
            ruta: `articles/${path}`,
          });
        }
      }
    }
  };
}

module.exports = router;
