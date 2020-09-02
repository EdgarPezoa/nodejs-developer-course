const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 3000;
const chalk = require("./src/utils/chalk");
const useRoutes = require("./src/routes");

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
useRoutes(app);

app.listen(PORT, () => {
    console.log(
        `${chalk.success("Server running on")} ${chalk.success.underline(
            "http://localhost:" + PORT
        )}`
    );
});
