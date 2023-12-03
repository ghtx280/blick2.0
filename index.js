import BLICK from './src/theme/index.js';

export const theme = BLICK;
export function config(e = BLICK || {}) {
    return e;
}
