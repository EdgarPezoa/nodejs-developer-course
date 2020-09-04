const users = require("./users");
const tasks = require("./tasks");
const auth = require("./auth");

const useRoutes = (app) => {
    app.use("", auth);
    app.use("/users", users);
    app.use("/tasks", tasks);
};

module.exports = useRoutes;