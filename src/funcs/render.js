import BLICK from '../theme/index.js';
import B_STYLE_TAG from '../style-tag.js';

import getRoot from './create-root.js';
import createCss from './create-css.js';
import prerender from './prerender.js';

import _STORE_, {
    B_STYLE_STORE,
    B_MEDIA_STORE,
    B_ATTRS_STORE,
    B_CSS_STORE,
} from '../store.js';

import { timer } from './timer.js';
import { createRule } from './create-rule.js';
import { checkRecord } from './check-record.js';
import { is } from './check-type.js';

let once;
let root;

export default function (record, params = {}) {
    
    if (record && !checkRecord(record)) return;
    
    const AS = BLICK._STORE_.B_ATTRS_STORE;
    const SS = BLICK._STORE_.B_STYLE_STORE;
    const MS = BLICK._STORE_.B_MEDIA_STORE;
    const CS = BLICK._STORE_.B_CSS_STORE;
    
    const TIMER = timer('Blick: Styles updated');
    const ATTRS = ['class', ...Object.keys(BLICK.attr)];
    const NODES = params.NODES || document.querySelectorAll(ATTRS.map((e) => `[${e}]`).join());

    if (!once || BLICK._CLI_) {
        root = getRoot();
        prerender();
        once = true;
    }

    let is_style_updated;

    NODES.forEach((node) => {
        for (const attr of ATTRS) {
            let ATTR_VALUE = node.getAttribute(attr);
            
            if (is.str(ATTR_VALUE)) ATTR_VALUE = ATTR_VALUE.trim();

            if (!ATTR_VALUE) continue;

            for (const token of ATTR_VALUE.trim().split(/\s+/g)) {
                if (!(attr in CS)) CS[attr] = '';
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
                        if (!(m.val in CS.MEDIA)) CS.MEDIA[m.val] = '';
                        if (token in MS[m.raw]) continue;

                        MS[m.raw][token] = RULE;
                        CS.MEDIA[m.val] += RULE + '\n';
                    }
                }
                else {
                    SS[attr][token] = RULE;
                    CS[attr] += RULE + '\n';
                }
               


                is_style_updated = true;
            }
        }
    });

    if (is_style_updated) {
        B_STYLE_TAG.textContent = createCss(root);
        if (BLICK.time) TIMER.stop(); // debugging the script execution time
    }

    return B_STYLE_TAG.textContent;
}
