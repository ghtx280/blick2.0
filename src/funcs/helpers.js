export function getTruthyKeys(obj) {
    if (typeof obj !== 'object') {
        return []
    }

    const entries = Object.entries(obj)
    const filtered = entries.filter(([key, val]) => val)
    return filtered.map(([key, val]) => key)
}

export function unique(list) {
    return Array.from(new Set(list));
}