const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth_controller');
const User = require('../db/models/User');
const controller = require('../controllers/users_controller');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

// Renderiza form para crear usuario
router.get('/new-user', auth.isAuth, async (req, res) => {
    res.render('admin/user-new', { user: req.user, alert: false, userNew: {} })
})
// Renderiza form para editar usuario
router.get('/edit-user/:id', auth.isAuth, async (req, res) => {
    const userQ = await User.findById(req.params.id);
    res.render('admin/user-edit', { user: req.user, userEdit: userQ, alert: false });
})


// Acción para crear usuario (submit form en user-new.ejs)
router.post('/new-user', auth.isAuth, controller.new);

// Acción para editar usuario (submit form en user-edit.ejs)
router.put('/edit-user/:id', auth.isAuth, controller.edit);

// Acción para eliminar usuario (submit form user-delete de #users en admin-page.ejs) 
router.delete('/delete-user/:id', auth.isAuth, controller.delete);


module.exports = router;