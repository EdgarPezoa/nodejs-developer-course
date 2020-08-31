const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

router.get("/help", (req, res) => {
    // http://localhost:3000/help?xd=123&uwu=saaa
    // req.query.xd : 123;
    // req.query.uwu : saaa;
    res.send({
        name: "Eddy",
        age: 24
    });
});

router.get("/about", (req, res) => {
    res.send("About page");
});

module.exports = router;