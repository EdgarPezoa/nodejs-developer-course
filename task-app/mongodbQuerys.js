const { ObjectID } = require("mongodb");
const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

//INSERT
// db.collection().insertOne(); -> Identical to insertMany
db.collection("tasks").insertMany(
    [
        {
            description: "Proyect management",
            completed: false,
        },
        {
            description: "Meeting",
            completed: true,
        },
    ],
    (error, result) => {
        if (error) {
            return console.log("Unable to insert data");
        }
        console.log(result.ops);
    }
);

//FIND ONE
db.collection("tasks").findOne({ completed: false }, (error, task) => {
    if (error) {
        return console.log(error);
    }
    console.log(tasks);
});

//FIND
db.collection("tasks").find({ completed: false }).toArray((error, tasks) => {
    if (error) {
        return console.log(error);
    }
    console.log(tasks);
});

//UPDATE
db.collection("tasks")
    .updateMany({ completed: true }, { $set: { completed: false } })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

//DELETE
db.collection("tasks")
    .deleteOne({ completed: false })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));