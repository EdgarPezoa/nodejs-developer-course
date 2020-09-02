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

const add = (a, b) => {
    return new Promise((resole, reject) => {
        setTimeout(() => {
            resole(a + b);
        }, 2000);
    });
};

// add(1, 2)
//     .then((sum) => console.log(sum))
//     .catch();

const doWork = async () => {
    const sum = await add(1, 2);
    const sum1 = await add(sum, 2);
    const sum2 = await add(sum1, 2);

    // throw new Error("Hubo un error");
    return sum2;
};

const dummyFn = async() => {
    try {
        console.log(await doWork());
    } catch (error) {
        console.log(error);
    }
};

dummyFn();
