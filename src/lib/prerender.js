import BLICK from '../theme/index.js';
import { is } from './check-type.js';
import { parseMedia } from './parser/parse-media.js';
import { B_CSS_STORE } from '../store.js';

export default function () {
    if (!BLICK.dark) {
        BLICK.dark = BLICK.states.dark('').trim();
    }

    if (typeof window !== undefined) {
        if (
            BLICK.autoTheme &&
            matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            if (BLICK.dark.startsWith('.')) {
                document.documentElement.classList.add(BLICK.dark.slice(1));
            } else if (BLICK.dark.startsWith('#')) {
                document.documentElement.id = BLICK.dark.slice(1);
            } else if (BLICK.dark.startsWith('[') && BLICK.dark.endsWith(']')) {
                document.documentElement.setAttribute(BLICK.dark.slice(1, -1));
            }
        }
    }

    if (BLICK.wrapper) {
        for (const scr in BLICK.screen) {
            let size = BLICK.screen[scr];

            BLICK._STORE_.B_CSS_STORE.MEDIA[parseMedia(scr)] =
                BLICK.wrapper +
                `{max-width:${is.num(size) ? size : size[0]}px}`;
        }
    }
}
