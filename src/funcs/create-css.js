import { B_CSS_STORE as CSS } from '../store';
import BLICK from '../theme';

export default function (root) {
    let media_str = '';
    let css_str = '';

    for (const attr in CSS) {
        if (attr === 'MEDIA') {
            for (const md in CSS.MEDIA) {
                let aaa = '';
                aaa += CSS.MEDIA[md];
                media_str += `@media ${md} {\n${aaa}}\n`;
            }
            continue;
        }
        css_str += CSS[attr] + '\n';
    }

    return `/* ! blickcss v${
        BLICK.version
    } | MIT License | https://github.com/ghtx280/blickcss */
  ${BLICK.reset || ''}
  ${BLICK.root ? root : ''}
  ${
      BLICK.wrapper
          ? `${BLICK.wrapper}{display:block;width:100%;margin:0 auto;padding-left:var(--wrapper-padding,15px);padding-right:var(--wrapper-padding,15px)}`
          : ''
  }
  ${BLICK.useAttr ? `[flex]{display:flex}[grid]{display:grid}` : ''}
  ${
      BLICK.autoFlex
          ? '[class*="flex-"],[class*="jc-"],[class*="ai-"],[class*="gap-"]{display:flex}'
          : ''
  }
  ${css_str + media_str}
  `;
}

// ${B_KEYFRAMES}
