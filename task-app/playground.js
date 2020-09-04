// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve([1, 4, 7]);
//         reject("Hubo un error");
//     }, 2000);
// });

// doWorkPromise.then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// });

// const add = (a, b) => {
//     return new Promise((resole, reject) => {
//         setTimeout(() => {
//             resole(a + b);
//         }, 2000);
//     });
// };

// add(1, 2)
//     .then((sum) => console.log(sum))
//     .catch();

// const doWork = async () => {
//     const sum = await add(1, 2);
//     const sum1 = await add(sum, 2);
//     const sum2 = await add(sum1, 2);

//     // throw new Error("Hubo un error");
//     return sum2;
// };

// const dummyFn = async() => {
//     try {
//         console.log(await doWork());
//     } catch (error) {
//         console.log(error);
//     }
// };

// dummyFn();

// const bcrypt = require("bcryptjs");

// const dummy = async() => {
//     const password = "Eddy123";
//     const hashPassword = await bcrypt.hash(password, 8);

//     console.log(password, hashPassword);
//     console.log("---------------------");
//     const compare = await bcrypt.compare(password, hashPassword);
//     console.log(compare);
// };
// dummy();

// const jwt = require("jsonwebtoken");

// const dummy = async () => {
//     const secret = "ThisIsRandomSeed";
//     const token = jwt.sign({ _id: "asd123" }, secret, { expiresIn: "7 days" });
//     console.log(token);
//     try {
//         const data = await jwt.verify(token, secret);
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// };

// dummy();

// const pet = {
//     name: "Aleu",
// };

// pet.toJSON = function () {
//     return {}
// };

// console.log(JSON.stringify(pet));

const Task = require("./src/models/Task");
const User = require("./src/models/User");

const main = async () => {
    // const task = await Task.findById("5f516516d6920d1ef4f9c113");
    // await task.populate("owner").execPopulate();
    // console.log(task.owner);
    const user = await User.findById("5f51645047ad9e295c95c03f");
    await user.populate("tasks").execPopulate();
    console.log(user.tasks);
};
main();
