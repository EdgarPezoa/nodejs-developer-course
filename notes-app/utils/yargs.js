const yargs = require("yargs");
const notes = require("../notes");
//Config
yargs.version("1.0.0");

//Commands
yargs.command({
    command: "add",
    describe: "Adding a new note...",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
        description: {
            describe: "Description of the note",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => {
        notes.addNotes(argv.title, argv.description);
    },
});

yargs.command({
    command: "remove",
    describe: "removing a note...",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => {
        notes.removeNotes(argv.title);
    },
});

yargs.command({
    command: "list",
    describe: "listing all notes...",
    handler: () => {
        notes.listNotes();
    },
});
yargs.command({
    command: "read",
    describe: "reading note...",
    builder:{
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => {
        notes.readNote(argv.title);
    },
});

yargs.parse();

module.exports = yargs;
