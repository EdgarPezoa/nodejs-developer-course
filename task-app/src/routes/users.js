const express = require("express");
const router = express.Router();
const User = require("../controllers/UserController");

router.get("/", User.listUsers);
router.post("/", User.createUser);
router.get("/:id", User.getUser);
router.patch("/:id", User.updateUser);
router.delete("/:id", User.deleteUser);

module.exports = router;
