const express = require("express");
const router = express.Router();
const Task = require("../controllers/TaskController");

router.get("/", Task.listTasks);
router.post("/", Task.createTask);
router.get("/:id", Task.getTask);
router.patch("/:id", Task.updateTask);
router.delete("/:id", Task.deleteTask);

module.exports = router;
