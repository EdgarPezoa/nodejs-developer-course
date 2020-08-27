const fs = require("fs");
const chalk = require("./utils/chalk");
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("data.json");
        return JSON.parse(dataBuffer.toString());
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync("data.json", JSON.stringify(notes));
};

const getNotes = () => {
    return "Your notes...";
};

const addNotes = (title, description) => {
    const notes = loadNotes();
    const duplicates = notes.filter((note) => {
        return note.title === title;
    });
    if (duplicates.length === 0) {
        const note = {
            title,
            description,
        };
        notes.push(note);
        saveNotes(notes);
        console.log(chalk.success("¡Node added!"));
    } else {
        console.log(chalk.warning("Note duplicated"));
    }
};

const removeNotes = (title) => {
    const notes = loadNotes();
    const notesFiltered = notes.filter((note) => note.title != title);
    if (notes.length === notesFiltered.length) {
        console.log(chalk.warning("Note not found"));
        return;
    }
    saveNotes(notesFiltered);
    console.log(chalk.success("¡Note deleted!"));
};

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length === 0) {
        console.log(chalk.warning("No notes founded"));
    }
    console.log(chalk.success("Listing notes..."));
    notes.forEach((note) => {
        console.log(note.title + " -> " + note.description);
    });
};

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.success("Note:"));
        console.log(note.title + " : " + note.description);
    } else {
        console.log(chalk.warning("Note does not exist"));
        return;
    }
};

module.exports = {
    getNotes,
    addNotes,
    removeNotes,
    listNotes,
    readNote,
};
