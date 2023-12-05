import BLICK from './theme/index.js';
import B_RENDER from './lib/render.js';
import B_STYLE_TAG from './style-tag.js';

import { is } from './lib/check-type.js';
import { parser } from './lib/parser/index.js';
import { createRule } from './lib/create-rule.js';
import { getTruthyKeys } from './lib/helpers.js';

// BLICK.is = is;
// BLICK.parser = parser;
// BLICK._STORE_ = _STORE_;
// BLICK.style_tag = B_STYLE_TAG;
// BLICK.createRule = createRule;

window.blick = BLICK;
window.blickcss = BLICK;

new MutationObserver(B_RENDER).observe(document.documentElement, {
    attributeFilter: ['class', ...getTruthyKeys(BLICK.attr)],
    childList: true,
    attributes: true,
    subtree: true,
});
