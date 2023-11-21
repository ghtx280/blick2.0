export default {
    _else: function (val) {
        if (val.includes('/')) {
            let [v1, v2] = val.split('/');
            if (+v1[0]) {
                return [
                    { _prop: `font-size:$;font-weight:${v2}`, _unit: 'px' },
                    v1,
                ];
            }
        } else {
            if (+val[0]) {
                return [{ _prop: 'font-size:$', _unit: 'px' }];
            }
        }

        return [{ _prop: 'color:$' }];
    },
    nowrap: 'white-space: nowrap',
    100: 'font-weight:100',
    200: 'font-weight:200',
    300: 'font-weight:300',
    400: 'font-weight:400',
    500: 'font-weight:500',
    600: 'font-weight:600',
    700: 'font-weight:700',
    800: 'font-weight:800',
    900: 'font-weight:900',

    light:     'font-weight:300',
    regular:   'font-weight:400',
    medium:    'font-weight:500',
    semibold:  'font-weight:600',
    bold:      'font-weight:700',
    extrabold: 'font-weight:800',

    tp:        'color:transparent!important',
    thin:      'font-weight:lighter',
    normal:    'font-weight:normal',
    bolder:    'font-weight:bolder',
    italic:    'font-style: italic',
    delete:    'text-decoration-line:line-through',
    line:      'text-decoration-line:underline',
    overline:  'text-decoration-line:overline',
    up:        'text-transform:uppercase',
    low:       'text-transform:lowercase',
    cap:       'text-transform:capitalize',
    center:    'text-align:center',
    left:      'text-align:left',
    right:     'text-align:right',
    justify:   'text-align:justify',

    mono:  'font-family:var(--font-mono)',
    serif: 'font-family:var(--font-serif)',
    sans:  'font-family:var(--font-sans)',

    vertical: 'writing-mode:vertical-lr',
    wrap: 'word-wrap:break-word',
    dots: 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%',
    cols:   { _prop: 'columns:$',        _unit: '' },
    lh:     { _prop: 'line-height:$',    _unit: '' },
    wg:     { _prop: 'font-weight:$',    _unit: '' },
    font:   { _prop: 'font-family:$',    _unit: '' },
    align:  { _prop: 'vertical-align:$', _unit: '' },
    space:  { _prop: 'white-space:$',    _unit: '' },
    shadow: {
        _one: 'text-shadow:3px 3px 2px #0000004d',
        _prop: 'text-shadow:$',
        _unit: 'px',
    },
    stroke: {
        _prop: '-webkit-text-stroke:$',
        _unit: 'px',
    },
    break: {
        _prop: 'word-break:$',
        _vals: { all: 'break-all', keep: 'keep-all' },
        _unit: '',
    },
};
