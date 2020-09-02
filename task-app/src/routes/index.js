const users = require("./users");
const tasks = require("./tasks");

const useRoutes = (app) => {
    app.use("/users", users);
    app.use("/tasks", tasks);
};

module.exports = useRoutes;