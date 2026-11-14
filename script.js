function myRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(p => {
            Promise.resolve(p).then(resolve, reject);
        });
    });
}

function myAny(promises) {
    return new Promise((resolve, reject) => {
        let rejectedCount = 0;
        const errors = [];

        promises.forEach((p, index) => {
            Promise.resolve(p).then(
                value => resolve(value),
                err => {
                    errors[index] = err;
                    rejectedCount++;
                    if (rejectedCount === promises.length) {
                        reject("all promises rejected");
                    }
                }
            );
        });
    });
}

function myAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completedCount = 0;

        if (promises.length === 0) {
            resolve([]);
            return;
        }

        promises.forEach((p, index) => {
            Promise.resolve(p).then(
                value => {
                    results[index] = value;
                    completedCount++;
                    if (completedCount === promises.length) {
                        resolve(results);
                    }
                },
                error => {
                    reject(error);
                }
            );
        });
    });
}

function myAllSettled(promises) {
    return new Promise((resolve) => {
        const results = [];
        let settledCount = 0;

        if (promises.length === 0) {
            resolve([]);
            return;
        }

        promises.forEach((p, index) => {
            Promise.resolve(p).then(
                value => {
                    results[index] = { status: 'fulfilled', value: value };
                    settledCount++;
                    if (settledCount === promises.length) {
                        resolve(results);
                    }
                },
                error => {
                    results[index] = { status: 'rejected', error: error };
                    settledCount++;
                    if (settledCount === promises.length) {
                        resolve(results);
                    }
                }
            );
        });
    });
}

// Export for module systems if required
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        myRace,
        myAny,
        myAll,
        myAllSettled
    };
}