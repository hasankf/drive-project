const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        unique:true,
        minlength:[3,'Username must be 3 chars long']
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        unique: true,
        minlength: [13, 'email must be 13 chars long']
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, 'pass must be 5 chars long']
    }
})

const user = mongoose.model('user', userSchema);
module.exports = user;