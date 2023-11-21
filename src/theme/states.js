export default {
    h: `:hover`,
    f: `:focus`,
    c: `:checked`,
    a: `:active`,
    first: `>*:first-child`,
    last: `>*:last-child`,
    odd: `>*:nth-child(odd)`,
    even: `>*:nth-child(even)`,
    ft: `>*:first-child`,
    lt: `>*:last-child`,
    od: `>*:nth-child(odd)`,
    ev: `>*:nth-child(even)`,
    all: ` *`,
    '*': ` *`,
    every: `>*`,
    '>': `>*`,
    bt: `>*+*`,
    between: `>*+*`,
    aft: `::after`,
    bef: `::before`,
    after: `::after`,
    before: `::before`,
    dark: (selector) => `.dark ${selector}`,
};