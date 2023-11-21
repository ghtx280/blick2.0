import _class from './class.js';

import flex from './attrs/flex.js';
import grid from './attrs/grid.js';
import text from './attrs/text.js';

import screen from './screen.js';
import states from './states.js';
import colors from './colors.js';
import font from './font.js';
import reset from './reset.js';
import * as funcs from './funcs.js';

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

    version: '1.3.6',

    ...funcs,
};

export default BLICK;
