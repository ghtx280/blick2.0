import BLICK from './theme/index.js';
import B_RENDER from './funcs/render.js';
import B_STYLE_TAG from './style-tag.js';

import { is } from './funcs/check-type.js';
import { parser } from './funcs/parser/index.js';
import { createRule } from './funcs/create-rule.js';

// BLICK.is = is;
// BLICK.parser = parser;
// BLICK._STORE_ = _STORE_;
// BLICK.style_tag = B_STYLE_TAG;
// BLICK.createRule = createRule;

window.blick = BLICK;
window.blickcss = BLICK;

new MutationObserver(B_RENDER).observe(document.documentElement, {
    attributeFilter: ['class', ...Object.keys(BLICK.attr)],
    childList: true,
    attributes: true,
    subtree: true,
});
