import { is } from './check-type.js';
import { parser } from './parser/index.js';

export function createRule(token, attr) {
    const STRUCT = parser(token, attr);

    if (!STRUCT) return null;

    const MEDIA = [];
    const DECLARED = [];

    if (STRUCT.states) {
        for (let i = STRUCT.states.length - 1; i >= 0; i--) {
            const state = STRUCT.states[i];
            if (state.type === 'pseudo') {
                if (is.func(state.val)) {
                    STRUCT.selector = state.val(STRUCT.selector);
                } else if (state.val?.includes('$')) {
                    STRUCT.selector = state.val.replace('$', STRUCT.selector);
                } else {
                    STRUCT.selector += state.val;
                }
            } else if (state.type === 'media') {
                MEDIA.push(state);
            }
        }
    }

    for (const rule of STRUCT.styles) {
        let style = rule.prop;

        if (is.func(rule.prop)) {
            style = rule.prop(rule) || '';
        } else if (rule.values) {
            const REGEXP = /\$(\d+)?/g;

            style = rule.prop.replace(REGEXP, (_, group) => {
                if (group) {
                    return rule.values[group - 1]?.val || rule.val;
                }
                return rule.val;
            });
        }

        DECLARED.push(style);
    }

    const STYLE = DECLARED.join(';').replace(/(?<!\\)_/g, ' ');

    return [MEDIA, `${STRUCT.selector}{${STYLE}}`];
}
