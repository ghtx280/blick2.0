import BLICK from '../../theme';
import _STORE_ from '../../store';
import format from '../format-selector';

import { parseStates } from './parse-states';
import { parseStyles } from './parse-styles';
import { is } from '../check-type';

export function parser(token = '', attr = 'class') {
    let [styles, ...states] = token.split(/(?<!\\):/g).reverse();
    let selector = format(token, attr);
    let rawSelector = selector;

    states = states.map((e) => parseStates(e, attr));
    styles = styles.split(/(?<!\\);/g);
    styles = styles.map((e) => parseStyles(e, attr));
    styles = styles.filter((e) => e);

    if (!states.length) {
        states = null;
    }

    if (styles.length) {
        const EXTRA_SELECTOR = styles[0].src?._selector;

        if (EXTRA_SELECTOR && is.str(EXTRA_SELECTOR)) {
            selector = EXTRA_SELECTOR.replace(/\$/g, selector);
        }

        return { states, styles, attr, selector, rawSelector, token };
    }

    return null;
}
