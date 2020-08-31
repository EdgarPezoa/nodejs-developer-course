//Routes
const root = require("./root");
const weather = require("./weather");

const setRoutes = (app) => {
    app.use("", root);
    app.use("/weather", weather);
};

module.exports = setRoutes;
