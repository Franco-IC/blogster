const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            default: 'user',
            unique: false
        },
        name: {
            type: String,
            required: true
        },
        pass: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    })

module.exports = mongoose.model('UserSchema', UserSchema, 'users');