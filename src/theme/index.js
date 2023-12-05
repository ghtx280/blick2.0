import _class from './class.js';

import flex from './attrs/flex.js';
import grid from './attrs/grid.js';
import text from './attrs/text.js';

import screen from './screen.js';
import states from './states.js';
import colors from './colors.js';
import font   from './font.js';
import reset  from './reset.js';
import funcs  from './funcs.js';

import { is         } from '../lib/check-type.js';
import { parser     } from '../lib/parser/index.js';
import { createRule } from '../lib/create-rule.js';

import _STORE_     from '../store.js';
import B_STYLE_TAG from '../style-tag.js';

import version from '../../version.js';

const BLICK = {
    class: _class,

    screen,
    states,
    colors,
    font,
    reset,

    attr: {
        flex,
        grid,
        text,
    },

    autoTheme: false,
    beautify: false,
    autoFlex: true,
    useAttr: true,
    time: false,
    root: true,

    wrapper: '.wrapper',
    maxPrefix: 'm-',

    beautifyOption: {},

    version,

    is,
    parser: parser,
    _STORE_: _STORE_,
    style_tag: B_STYLE_TAG,
    createRule: createRule,

    ...funcs,
};





// BLICK.is = is;
// BLICK.parser = parser;
// BLICK._STORE_ = _STORE_;
// BLICK.style_tag = B_STYLE_TAG;
// BLICK.createRule = createRule;

export default BLICK;
