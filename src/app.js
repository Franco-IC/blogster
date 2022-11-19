const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('../routes/articles');
const authRouter = require('../routes/auth');
const usersRouter = require('../routes/users');
const Article = require('../db/models/Article');
const auth = require('../controllers/auth_controller');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const User = require('../db/models/User');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
// para procesar datos de forms
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// cookies
app.use(cookieParser());

// Home
app.get('/', auth.isAuth, (req, res) => {
    res.redirect('/home')
})
app.get('/home', auth.isAuth, async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: -1
    });
    res.render('articles/index', { articles: articles, user: req.user });
})

// About
app.get('/about', auth.isAuth, (req, res) => {
    res.render('articles/about', { user: req.user })
})

// Panel de Administración
app.get('/admin-page', auth.isAuth, async (req, res) => {
    let users = await User.find();
    req.user.role === 'admin' ? res.render('admin/admin-page', { user: req.user, users: users }) : res.redirect('/home')
})

// Routers
app.use('/', authRouter);
app.use('/articles', articleRouter);
app.use('/admin-page', usersRouter);

// limpiar caché y que no se pueda volver con el botón de Back después del Log Out
app.use((req, res, next) => {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    }
    next();
});

// Conexión a MongoDB 
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((err) => console.error(err))



app.listen(port,
    () => console.log(`Server en puerto ${port}`)
)