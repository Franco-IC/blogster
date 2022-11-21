const bcrypt = require('bcryptjs');
const User = require('../db/models/User');

exports.new = async (req, res) => {
    let usuario = req.body;
    let userObj = new User();

    // Errores
    // Campos vacíos
    if (!usuario.username || !usuario.name) {
        res.render('admin/user-new', {
            user: req.user,
            ruta: 'new-user',
            // Alert opts
            alert: true,
            alertTitle: 'Error',
            alertMessage: 'Uno o más campos están vacios.',
            alertIcon: 'error',
            showConfirmButton: 'true'
        })
    }
    // Contraseña inválida <= 6 caracteres
    if (usuario.password.trim().length >= 0 && usuario.password.trim().length <= 5) {
        res.render('admin/user-new', {
            user: req.user,
            ruta: 'new-user',
            // Alert opts
            alert: true,
            alertTitle: 'Error',
            alertMessage: 'Contraseña inválida, debe ser de una longitud mayor o igual a 6 caracteres (sin espacios).',
            alertIcon: 'error',
            showConfirmButton: 'true',
        })
    } else {
        let passHash = await bcrypt.hash(usuario.password.trim(), 8)
        userObj.name = usuario.name.trim();
        userObj.user = usuario.username.trim();
        userObj.role = usuario.role;
        userObj.pass = passHash;
        try {
            userObj = await userObj.save();
            res.render('admin/user-new', {
                user: req.user,
                // Alert opts
                alert: true,
                alertTitle: '¡Listo!',
                alertMessage: 'Usuario creado con éxito.',
                alertIcon: 'success',
                showConfirmButton: '',
            })
        } catch (error) {
            console.log(error.message);
            res.render('admin/user-new', {
                userNew: usuario,
                user: req.user,
                ruta: 'new-user',
                // Alert opts
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Ya existe un usuario con ese nombre, usa otro por favor.',
                alertIcon: 'error',
                showConfirmButton: 'true'
            })
        }
    }
}

exports.edit = async (req, res) => {
    let user = await User.findById(req.params.id);
    let usuario = req.body;

    // Errores
    // Campos vacíos
    if (!usuario.username || !usuario.name) {
        res.render('admin/user-edit', {
            userEdit: usuario,
            userID: user.id,
            user: req.user,
            ruta: 'editID',
            // Alert opts
            alert: true,
            alertTitle: 'Error',
            alertMessage: 'Uno o más campos están vacios.',
            alertIcon: 'error',
            showConfirmButton: 'true'
        })
    }
    // Contraseña inválida (error: -6 caracteres)
    if (usuario.password.trim().length >= 1 && usuario.password.trim().length <= 5) {
        res.render('admin/user-edit', {
            userEdit: usuario,
            userID: user.id,
            user: req.user,
            ruta: 'editID',
            // Alert opts
            alert: true,
            alertTitle: 'Error',
            alertMessage: 'Contraseña inválida, debe ser de una longitud mayor o igual a 6 caracteres (sin espacios).',
            alertIcon: 'error',
            showConfirmButton: 'true',
        })
    } else { // Caso de éxito
        user.name = usuario.name.trim();
        user.user = usuario.username.trim();
        if (user.role != usuario.role) {
            user.role = usuario.role
        }
        // Se deja la contraseña como estaba si no hubo cambios
        if (usuario.password.trim().length > 0) {
            let passHash = await bcrypt.hash(usuario.password.trim(), 8);
            user.pass = passHash;
        }
        try {
            user = await user.save();
            res.redirect('/admin-page');
        } catch (error) {
            console.log(error.message);
            res.render('admin/user-edit', {
                userEdit: usuario,
                userID: user.id,
                user: req.user,
                ruta: 'editID',
                // Alert opts
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Ya existe un usuario con ese nombre, usa otro por favor.',
                alertIcon: 'error',
                showConfirmButton: 'false',
            })
        }
    }


}

exports.delete = async (req, res) => {
    let user = await User.findById(req.params.id);
    if (user.user !== 'franco99') user = await User.deleteOne({ _id: req.params.id });
    res.redirect('/admin-page');
}