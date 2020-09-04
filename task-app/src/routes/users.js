const express = require("express");
const router = express.Router();
const User = require("../controllers/UserController");
const isAuth = require("../middleware/isAuth");

router.post("/", User.createUser);
router.get("/", isAuth, User.listUsers);
router.get("/me", isAuth, User.user);
router.patch("/me", isAuth, User.updateUser);
router.delete("/me", isAuth, User.deleteUser);
// router.get("/:id", User.getUser);
// router.patch("/:id", User.updateUser);
// router.delete("/:id", User.deleteUser);

module.exports = router;
