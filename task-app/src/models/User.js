const mongoose = require("../database/mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error("Email is invalid");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(password) {
            if (password.toLowerCase().includes("password")) {
                throw new Error("Password can not be 'password'");
            }
        },
    },
    age: {
        type: Number,
        required: true,
        min: 0,
    },
});

module.exports = User;
