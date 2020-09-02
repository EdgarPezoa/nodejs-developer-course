const Task = require("../models/Task");
const mongoose = require("mongoose");
const createTask = async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201);
        res.send(task);
    } catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};

const listTasks = async (req, res) => {
    try {
        const users = await Task.find();
        res.status(200);
        res.send(users);
    } catch (error) {
        res.status(200).send();
    }
};

const getTask = async (req, res) => {
    const _id = req.params.id;
    if (!mongoose.isValidObjectId(_id)) {
        res.status(404);
        res.send({ error: "Task not found" });
    }

    try {
        const task = await Task.findById(_id);
        if (task) {
            res.status(200);
            return res.send(task);
        }
        res.status(404);
        res.send({ error: "Task not found" });
    } catch (error) {
        res.status(404);
        res.send({ error: "Task not found" });
    }
};

const updateTask = async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if(!isValidOperation){
        res.status(404);
        res.send({ error: "Invalid update operation" });
    }

    if (!mongoose.isValidObjectId(_id)) {
        res.status(404);
        res.send({ error: "Task not found" });
    }
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true });
        if (task) {
            res.status(200);
            res.send(task);
        }
        res.status(404);
        res.send({ error: "Task not found" });
    } catch (error) {
        res.status(404);
        res.send({ error: "Task not found" });
    }
};

const deleteTask = async (req, res) => {
    const _id = req.params.id;
    if (!mongoose.isValidObjectId(_id)) {
        res.status(404);
        res.send({ error: "Task not found" });
    }
    try {
        const task = await Task.findByIdAndDelete(_id);
        if (task) {
            res.status(200);
            res.send(task);
        }
        res.status(404);
        res.send({ error: "Task not found" });
    } catch (error) {
        res.status(404);
        res.send({ error: "Task not found" });
    }
};

module.exports = {
    createTask,
    listTasks,
    getTask,
    updateTask,
    deleteTask
};
