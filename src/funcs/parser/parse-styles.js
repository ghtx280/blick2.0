import BLICK from '../../theme/index.js';

import { parseRule } from './parse-rule.js';
import { parseValue } from './parse-value.js';
import { is } from '../check-type.js';

export function parseStyles(style, attr) {
    let object = BLICK.attr[attr] || BLICK.class;
    let property = null;
    let values = null;

    let { source, path, value } = parseRule(style, object);

    if (!source && attr !== 'class') {
        let [s, v] = BLICK.attr[attr]._else(style) || [null, null];
        source = s;
        value = v || style;
    }

    if (!source) return;

    if (value) {
        property = source._prop;
        values = parseValue(value, source);
    } else {
        property = source._one || source;
    }

    if (!property) return null;

    return {
        src: source,
        path: path,
        prop: property,
        values: values,
        rawVal: value,
        val: values?.map((e) => e.val).join(source._join || ' ') || null,
        unit: source._unit || '',
        join: source._join || ' ',
    };
}
