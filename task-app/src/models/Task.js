const mongoose = require("../database/mongoose");

const Task = mongoose.model("Taks", {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = Task;
