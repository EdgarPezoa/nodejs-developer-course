const User = require("../models/User");
const mongoose = require("mongoose");

const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        userResult = await user.save();
        token = await user.generateAuthToken();
        res.status(201);
        res.send({ userResult, token });
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200);
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
};

const user = async (req, res) => {
    res.send(req.user);
};

const getUser = async (req, res) => {
    const _id = req.params.id;
    if (!mongoose.isValidObjectId(_id)) {
        res.status(404);
        res.send({ error: "User not found" });
    }
    try {
        const user = await User.findById(_id);
        if (user) {
            res.status(200);
            return res.send(user);
        }
        res.status(404);
        res.send({ error: "User not found" });
    } catch (error) {
        res.status(404);
        res.send({ error: "User not found" });
    }
};

const updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
        res.status(404);
        res.send({ error: "Invalid update operation" });
    }
    try {
        updates.forEach((update) => (req.user[update] = req.body[update]));
        const user = await req.user.save();
        if (user) {
            res.status(200);
            return res.send(user);
        }
    } catch (error) {
        res.status(404);
        res.send(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        req.user.delete();
        res.status(200);
        res.send(req.user);
    } catch (error) {
        res.status(404);
        res.send({ error: "User not found" });
    }
};

module.exports = {
    createUser,
    listUsers,
    user,
    getUser,
    updateUser,
    deleteUser,
};
