export function timer(label) {
    const startTime = performance.now();
    return {
        stop: function () {
            const endTime = performance.now();
            const elapsedTime = endTime - startTime;
            console.log(`${label}: ${elapsedTime.toFixed(1)}ms`);
        },
    };
}
