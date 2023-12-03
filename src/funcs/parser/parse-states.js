import BLICK from '../../theme/index.js';
import { is } from '../check-type.js';
import { parseMedia } from './parse-media.js';

export function parseStates(state, attr) {
    const IS_IN_ARR = state in BLICK.screen;
    const IS_MAX_WD = state.startsWith(BLICK.maxPrefix);
    const IS_NUMBER = +state;

    let raw = state;
    let val = null;
    let type = null;

    if (IS_IN_ARR || IS_NUMBER || IS_MAX_WD) {
        val = parseMedia(state);
        type = 'media';
    } else {
        if (raw.startsWith('&')) {
            val = raw.slice(1);
        } else {
            val = BLICK.states[raw] || ':' + raw;
        }
        if (is.str(val)) {
            val = val.replace(/(?<!\\)_/g, ' ');
        }

        type = 'pseudo';
    }
    return { raw, val, type };
}
