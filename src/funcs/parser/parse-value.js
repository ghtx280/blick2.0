import BLICK from '../../theme';
import { getHexAlpha, getVarColor, getHex } from '../../theme/funcs';
import { is } from '../check-type';

function createColor(color, opacity) {
    if (BLICK._COLOR_) {
        return BLICK._COLOR_(color, opacity);
    }
    return getHex(color) + getHexAlpha(opacity);
}

function createVar(variable, opacity = '') {
    if (is.var(variable)) {
        variable = variable.slice(1);
    }
    if (opacity) {
        opacity = `;opacity:${opacity}`;
    }

    return `var(--${variable})${opacity}`;
}

function calcOpacity(number) {
    if (+number) {
        return number > 1 ? number / 100 : number;
    }
}

function getItem(item = '', source = {}) {
    const [first, second] = item.replaceAll('\\', '').split('/');
    const UNIT = source?._unit || '';

    if (!first) return;

    if (second && +second) {
        if (+first) {
            return +((first / second) * 100).toFixed(2) + '%';
        }

        if (is.var(first)) {
            const COLOR = getVarColor(first);

            if (COLOR) {
                return createColor(COLOR, second);
            }

            return createVar(first, calcOpacity(second));
        }

        return createColor(first, second);
    }

    if (is.var(first)) {
        return createVar(first);
    }

    return +item ? item + UNIT : item;
}

/*
  (num/num) 1/2 = 50%
  (var/num) $foo/50 = foo in blick.colors ? getVarColor(foo) : var(-foo);opacity:0.5 
  (str/num) red/50 = #ff000080

  (num) 15 = 15 + (unit || "")
  (str) 5em = 5em
*/

export function parseValue(value = '', source = {}) {
    if (!value) return null;

    return value.split(/(?<!\\)\+/g).map((item) => {
        return {
            val:
                source._vals?.[item] ??
                getItem(item, source).replace(/\\/g, ''),
            raw: item,
        };
    });
}
