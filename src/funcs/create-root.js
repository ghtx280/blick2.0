import BLICK from '../theme';
import { is } from './check-type';

export default function () {
    let fonts = '';
    let colors = '';

    for (const type in BLICK?.font) {
        fonts += `--font-${type}:${BLICK.font[type]};`;
    }

    for (const color in BLICK?.colors) {
        if (is.str(BLICK.colors[color])) {
            colors += `--${color}:${BLICK.colors[color]};`;
            continue;
        }

        for (const num in BLICK.colors[color]) {
            colors += `--${color + (num === 'def' ? '' : '-' + num)}:${
                BLICK.colors[color][num]
            };`;
        }
    }
    return `:root{${colors + fonts}}`;
}
