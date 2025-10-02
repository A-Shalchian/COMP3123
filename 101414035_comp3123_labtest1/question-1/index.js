function lowerCaseWords(arr) {
    return new Promise((res, rej) => {
        if (!Array.isArray(arr)) {
            rej("Input must be an array");
        } else {
            const result = arr
                .filter(item => typeof item === 'string')
                .map(word => word.toLowerCase());
            res(result);
        }
    });
}

const mixedArray = ['PIZZA', 10, true, 25, false, 'Wings'];

lowerCaseWords(mixedArray)
    .then(result => console.log(result))
    .catch(error => console.error(error));