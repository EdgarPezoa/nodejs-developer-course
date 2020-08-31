const add = (a, b, callback) => {
    const sum = a + b;
    setTimeout(() => {
        callback(sum);
    }, 2000);
};

add(1, 4, (sum) => {
    console.log(sum);
});
