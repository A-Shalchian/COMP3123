const resolvedPromise = () => {
    return new Promise((res) => {
        setTimeout(() => {
            let success = { message: 'delayed success!' };
            console.log(success);
            res(success);
        }, 500);
    });
};

const delayedException = () => {
    return new Promise((res, reject) => {
        setTimeout(() => {
            try {
                throw new Error('error: delayed exception!');
            } catch (e) {
                let error = { error: 'delayed exception!' };
                console.error(error);
                reject(error);
            }
        }, 500);
    });
};

// if i dont add .then and .catch here the test will fail
resolvedPromise()
    .then(result => result)
    .catch(error => error);

delayedException()
    .then(result => result)
    .catch(error => error);
