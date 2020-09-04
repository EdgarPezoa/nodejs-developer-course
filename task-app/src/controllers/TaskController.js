const Task = require("../models/Task");
const mongoose = require("mongoose");
const { update } = require("../models/Task");

const createTask = async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id,
    });

    try {
        taskResult = await task.save();
        res.status(201);
        res.send(taskResult);
    } catch (error) {
        res.status(400);
        res.send({ error: error.message });
    }
};

const listTasks = async (req, res) => {
    const match = {};
    const sort = {};
    if (req.query.completed) {
        match.completed = req.query.completed === "true";
    }

    if (req.query.sortBy) {
        const sortParts = req.query.sortBy.split(":");
        sort[sortParts[0]] = sortParts[1] === "desc" ? -1 : 1;
    }

    try {
        await req.user
            .populate({
                path: "tasks",
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort,
                },
            })
            .execPopulate();
        res.status(200);
        res.send(req.user.tasks);
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
        const task = await Task.findOne({ _id, owner: req.user._id });
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
    const allowedUpdates = ["completed"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
        res.status(404);
        res.send({ error: "Invalid update operation" });
    }

    if (!mongoose.isValidObjectId(_id)) {
        res.status(404);
        res.send({ error: "Task not found" });
    }
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (task) {
            updates.forEach((update) => (task[update] = req.body[update]));
            task.save();
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
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
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
    deleteTask,
};
