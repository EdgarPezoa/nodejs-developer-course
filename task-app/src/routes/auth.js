const express = require("express");
const router = express.Router();
const auth = require("../controllers/AuthController");
const isAuth = require("../middleware/isAuth");

router.post("/login", auth.login);
router.post("/logout", isAuth, auth.logout);
router.post("/logout_all", isAuth, auth.logoutAll);

module.exports = router;
