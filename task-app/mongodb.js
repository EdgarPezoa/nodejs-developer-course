const { MongoClient, ObjectID } = require("mongodb");
const chalk = require("./utils/chalk");

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
    connectionUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
        if (error) {
            return console.log(chalk.error("Unable to connect to database"));
        }
        console.log(chalk.success("Connected correctly to database"));
        const db = client.db(databaseName);
        db.collection("tasks")
            .deleteOne({ completed: false })
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
    }
);
