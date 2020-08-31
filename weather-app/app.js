const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const config = require("./config");
const chalk = require("./utils/chalk");
const setRoutes = require("./routes");

// use APP
app.use(logger("dev"));
app.use(cookieParser());
setRoutes(app);

//Serve node
app.listen(config.PORT, () => {
    console.log(
        chalk.success.inverse(`Server starting on: `) +
        chalk.success.inverse.underline(`http://localhost:${config.PORT}`)
    );
});
