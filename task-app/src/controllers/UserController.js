const User = require("../models/User");
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        user.save();
        res.status(200);
        res.send(user);
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
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
        res.status(404);
        res.send({ error: "Invalid update operation" });
    }

    if (!mongoose.isValidObjectId(_id)) {
        res.status(404);
        res.send({ error: "User not found" });
    }
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
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

const deleteUser = async (req, res) => {
    const _id = req.params.id;
    if (!mongoose.isValidObjectId(_id)) {
        res.status(404);
        res.send({ error: "User not found" });
    }
    try {
        const user = await User.findByIdAndDelete(_id);
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

module.exports = {
    createUser,
    listUsers,
    getUser,
    updateUser,
    deleteUser,
};
