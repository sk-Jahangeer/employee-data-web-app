const asyncHandler =
    (fn) =>
    async (...args) => {
        try {
            await fn(...args);
        } catch (err) {
            console.log(err);
        }
    };

module.exports = asyncHandler;
