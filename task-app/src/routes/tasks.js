const express = require("express");
const router = express.Router();
const Task = require("../controllers/TaskController");
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, Task.listTasks);
router.post("/", isAuth, Task.createTask);
router.get("/:id", isAuth, Task.getTask);
router.patch("/:id", isAuth, Task.updateTask);
router.delete("/:id", isAuth, Task.deleteTask);

module.exports = router;
