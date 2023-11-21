import BLICK from '../../theme';
import { createMediaWidth } from '../create-media-width';

export function parseMedia(str) {
    if (!str) throw new Error(`value is required, (${str})`);

    if (str.startsWith(BLICK.maxPrefix)) {
        str = str.slice(BLICK.maxPrefix.length);
        return createMediaWidth([null, BLICK.screen[str] || str]);
    }

    return createMediaWidth(BLICK.screen[str] || str);
}
