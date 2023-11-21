import BLICK from '../theme';
import B_STYLE_TAG from '../style-tag';

import getRoot from './create-root';
import createCss from './create-css';
import prerender from './prerender';

import {
    B_STYLE_STORE,
    B_MEDIA_STORE,
    B_ATTRS_STORE,
    B_CSS_STORE,
} from '../store';

import { timer } from './timer';
import { createRule } from './create-rule';
import { checkRecord } from './check-record';

let once;

const AS = B_ATTRS_STORE;
const SS = B_STYLE_STORE;
const MS = B_MEDIA_STORE;
const CSS = B_CSS_STORE;

export default function (record) {
    if (!checkRecord(record)) return;

    const TIMER = timer('Blick: Styles updated');
    const ATTRS = ['class', ...Object.keys(BLICK.attr)];
    const NODES = document.querySelectorAll(ATTRS.map((e) => `[${e}]`).join());

    if (!once) {
        root = getRoot();
        prerender();
        once = true;
    }

    let is_style_updated;

    NODES.forEach((node) => {
        for (const attr of ATTRS) {
            const ATTR_VALUE = node.getAttribute(attr);

            if (!ATTR_VALUE) continue;

            for (const token of ATTR_VALUE.trim().split(/\s+/g)) {
                if (!(attr in CSS)) CSS[attr] = '';
                if (!(attr in SS)) SS[attr] = Object.create(null);
                if (!(attr in AS)) AS[attr] = Object.create(null);
                if (token in SS[attr]) continue;
                if (token in AS[attr]) continue;

                AS[attr][token] = true;

                const [MEDIA, RULE] = createRule(token, attr) || [[], ''];

                if (!RULE) {
                    SS[attr][token] = null;
                    continue;
                }

                if (MEDIA.length) {
                    for (const m of MEDIA) {
                        if (!(m.raw in MS)) MS[m.raw] = Object.create(null);
                        if (!(m.val in CSS.MEDIA)) CSS.MEDIA[m.val] = '';
                        if (token in MS[m.raw]) continue;

                        MS[m.raw][token] = RULE;
                        CSS.MEDIA[m.val] += RULE + '\n';
                    }
                    continue;
                }

                SS[attr][token] = RULE;
                CSS[attr] += RULE + '\n';

                is_style_updated = true;
            }
        }
    });

    if (is_style_updated) {
        B_STYLE_TAG.textContent = createCss(root);
        if (BLICK.time) TIMER.stop(); // debugging the script execution time
    }
}
