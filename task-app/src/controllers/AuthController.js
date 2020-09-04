const User = require("../models/User");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.status(200);
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: "Unable to login" });
    }
};

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(
            (token) => token.token !== req.token
        );
        await req.user.save();
        res.status(200);
        res.send();
    } catch (error) {
        res.status(500).send();
    }
};

const logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200);
        res.send();
    } catch (error) {
        res.status(500).send();
    }
};

module.exports = {
    login,
    logout,
    logoutAll,
};
