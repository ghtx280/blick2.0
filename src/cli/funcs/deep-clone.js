export function deepClone(obj) {
    if (
        obj === null ||
        typeof obj !== 'object' ||
        typeof obj === 'function'
    ) {
        return obj;
    }

    if (Array.isArray(obj)) {
        const clonedArray = obj.map(e => deepClone(e));
        return clonedArray;
    }

    const clonedObj = {};
    for (let key in obj) {
        clonedObj[key] = deepClone(obj[key]);
    }
    return clonedObj;
}
