const mongoose = require("../database/mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./Task");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
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
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner",
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "ThisIsSecretSeed");
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    return user;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to login");
    }
    return user;
};

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.pre(
    "findOneAndUpdate",
    { document: true, query: false },
    async function (next) {
        const user = this;
        next();
    }
);

userSchema.pre("remove", async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
