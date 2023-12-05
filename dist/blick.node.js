#!/usr/bin/env node

// src/node/index.js
import fs3 from "fs";
import fg from "fast-glob";
import url from "url";
import path from "path";
import chokidar from "chokidar";

// src/theme/class.js
var w_vals = {
  full: "100%",
  half: "50%",
  min: "min-content",
  fit: "fit-content",
  max: "max-content",
  screen: "100vw"
};
var h_vals = {
  full: "100%",
  half: "50%",
  min: "min-content",
  fit: "fit-content",
  max: "max-content",
  screen: "100vh"
};
var c_vals = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  sb: "space-between",
  sa: "space-around",
  se: "space-evenly"
};
var i_vals = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  st: "stretch"
};
var classes = {
  // test: {
  //     _prop: 'baz: $1; foo: $2; ggg: $',
  //     _unit: 'px',
  // },
  // test2: {
  //   _one: () => "test-222"
  // },
  m: {
    _prop: "margin:$",
    _unit: "px"
  },
  my: {
    _prop: "margin-top:$;margin-bottom:$",
    _unit: "px"
  },
  mx: {
    _prop: "margin-left:$;margin-right:$",
    _unit: "px"
  },
  mt: {
    _prop: "margin-top:$",
    _unit: "px"
  },
  mr: {
    _prop: "margin-right:$",
    _unit: "px"
  },
  mb: {
    _prop: "margin-bottom:$",
    _unit: "px"
  },
  ml: {
    _prop: "margin-left:$",
    _unit: "px"
  },
  ms: {
    _prop: "margin-inline-start:$",
    _unit: "px"
  },
  me: {
    _prop: "margin-inline-end:$",
    _unit: "px"
  },
  center: "margin:auto",
  p: {
    _prop: "padding:$",
    _unit: "px"
  },
  py: {
    _prop: "padding-top:$;padding-bottom:$",
    _unit: "px"
  },
  px: {
    _prop: "padding-left:$;padding-right:$",
    _unit: "px"
  },
  pt: {
    _prop: "padding-top:$",
    _unit: "px"
  },
  pr: {
    _prop: "padding-right:$",
    _unit: "px"
  },
  pb: {
    _prop: "padding-bottom:$",
    _unit: "px"
  },
  pl: {
    _prop: "padding-left:$",
    _unit: "px"
  },
  ps: {
    _prop: "padding-inline-start:$",
    _unit: "px"
  },
  pe: {
    _prop: "padding-inline-end:$",
    _unit: "px"
  },
  space: {
    _prop: "margin-left:$",
    _selector: "$>*+*",
    _unit: "px",
    x: { _prop: "margin-left:$", _selector: "$>*+*", _unit: "px" },
    y: { _prop: "margin-top:$", _selector: "$>*+*", _unit: "px" }
  },
  b: {
    _prop: "border-width:$",
    _unit: "px"
  },
  bt: {
    _prop: "border-top-width:$",
    _unit: "px"
  },
  br: {
    _prop: "border-right-width:$",
    _unit: "px"
  },
  bb: {
    _prop: "border-bottom-width:$",
    _unit: "px"
  },
  bl: {
    _prop: "border-left-width:$",
    _unit: "px"
  },
  bc: {
    _prop: "border-color:$",
    _vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  bs: {
    _prop: "border-style:$"
  },
  border: {
    _one: "border:1px solid",
    _prop: "border:$",
    _unit: "px"
  },
  outline: {
    _prop: "outline:$",
    _unit: "px"
  },
  fill: {
    _prop: "fill:$",
    _vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  stroke: {
    _prop: "stroke:$",
    _vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  unappearance: "appearance:none",
  unapp: "appearance:none",
  scale: {
    _prop: "scale:$"
  },
  rotate: {
    _prop: "rotate:$",
    _unit: "deg"
  },
  translate: {
    _prop: "translate:$",
    _unit: "px"
  },
  skew: {
    _prop: "transform:skew($)",
    _unit: "deg",
    _join: ",",
    x: {
      _prop: "transform:skewX($)",
      _unit: "deg"
    },
    y: {
      _prop: "transform:skewY($)",
      _unit: "deg"
    }
  },
  flip: {
    _one: "scale:-1 -1",
    _prop: "scale:$",
    _vals: {
      x: "-1 1",
      y: "1 -1"
    }
  },
  clamp: {
    _prop: "overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:$"
  },
  inset: {
    _prop: "inset:$",
    x: { _prop: "left:$;right:$" },
    y: { _prop: "top:$;bottom:$" }
  },
  start: { _prop: "inset-inline-start:$" },
  end: { _prop: "inset-inline-end:$" },
  tf: {
    _prop: "transform:$",
    sc: {
      _prop: "transform:scale($)",
      _join: ","
    },
    sc3d: {
      _prop: "transform:scale3d($)",
      _join: ","
    },
    scx: {
      _prop: "transform:scaleX($)"
    },
    scy: {
      _prop: "transform:scaleY($)"
    },
    scz: {
      _prop: "transform:scaleZ($)"
    },
    rt: {
      _prop: "transform:rotate($)",
      _unit: "deg"
    },
    rt3d: {
      _prop: "transform:rotate3d($)",
      _join: ","
    },
    rtx: {
      _prop: "transform:rotateX($)",
      _unit: "deg"
    },
    rty: {
      _prop: "transform:rotateY($)",
      _unit: "deg"
    },
    rtz: {
      _prop: "transform:rotateZ($)",
      _unit: "deg"
    },
    tl: {
      _prop: "transform:translate($)",
      _unit: "px",
      _join: ","
    },
    tl3d: {
      _prop: "transform:translate3d($)",
      _join: ","
    },
    tlx: {
      _prop: "transform:translateX($)",
      _unit: "px"
    },
    tly: {
      _prop: "transform:translateY($)",
      _unit: "px"
    },
    tlz: {
      _prop: "transform:translateZ($)",
      _unit: "px"
    },
    sk: {
      _prop: "transform:skew($)",
      _unit: "deg",
      _join: ","
    },
    skx: {
      _prop: "transform:skewX($)",
      _unit: "deg"
    },
    sky: {
      _prop: "transform:skewY($)",
      _unit: "deg"
    }
  },
  w: {
    _prop: "width:$",
    _vals: w_vals,
    _unit: "px"
  },
  h: {
    _prop: "height:$",
    _vals: h_vals,
    _unit: "px"
  },
  sq: {
    _prop: "width:$;height:$",
    _vals: { full: "100%" },
    _unit: "px"
  },
  max: {
    w: {
      _prop: "max-width:$",
      _vals: w_vals,
      _unit: "px"
    },
    h: {
      _prop: "max-height:$",
      _vals: h_vals,
      _unit: "px"
    }
  },
  min: {
    w: {
      _prop: "min-width:$",
      _vals: w_vals,
      _unit: "px"
    },
    h: {
      _prop: "min-height:$",
      _vals: h_vals,
      _unit: "px"
    }
  },
  minW: {
    _prop: "min-width:$",
    _vals: w_vals,
    _unit: "px"
  },
  minH: {
    _prop: "min-height:$",
    _vals: h_vals,
    _unit: "px"
  },
  maxW: {
    _prop: "max-width:$",
    _vals: w_vals,
    _unit: "px"
  },
  maxH: {
    _prop: "max-height:$",
    _vals: h_vals,
    _unit: "px"
  },
  d: {
    _prop: "display:$",
    _vals: {
      inblock: "inline-block",
      inflex: "inline-flex",
      ingrid: "inline-grid"
    }
  },
  table: {
    _one: "display:table",
    _prop: "display:table-$"
  },
  inline: "display:inline",
  block: "display:block",
  inblock: "display:inline-block",
  inflex: "display:inline-flex",
  ingrid: "display:inline-grid",
  hide: "display:none",
  hidden: "display:none",
  upper: "text-transform:uppercase",
  uppercase: "text-transform:uppercase",
  lower: "text-transform:lowercase",
  lowercase: "text-transform:lowercase",
  capit: "text-transform:capitalize",
  capitalize: "text-transform:capitalize",
  pos: {
    _prop: "position:$"
  },
  static: "position:static",
  abs: "position:absolute",
  absolute: "position:absolute",
  rel: "position:relative",
  relative: "position:relative",
  sticky: "position:sticky",
  fixed: "position:fixed",
  r: {
    _prop: "border-radius:$",
    _unit: "px"
  },
  round: {
    _one: "border-radius:9999px",
    _prop: "border-radius:$",
    _unit: "px"
  },
  sharp: "border-radius:0",
  transition: {
    _prop: "transition:$",
    _unit: "ms"
  },
  time: {
    _prop: "transition:$",
    _unit: "ms"
  },
  select: {
    _prop: "user-select:$"
  },
  fit: {
    _prop: "object-fit:$",
    top: "object-position:top",
    bottom: "object-position:bottom",
    center: "object-position:center",
    left: {
      _one: "object-position:left",
      _prop: "object-position:left $"
    },
    right: {
      _one: "object-position:right",
      _prop: "object-position:right $"
    }
  },
  bg: {
    _prop: "background:$",
    tp: "background-color:transparent",
    cc: "background-color:currentcolor",
    f: "background-color:#fff",
    0: "background-color:#000",
    fixed: "background-attachment:fixed",
    local: "background-attachment:local",
    scroll: "background-attachment:scroll",
    clip: {
      border: "background-clip:border-box",
      padding: "background-clip:padding-box",
      content: "background-clip:content-box",
      text: "background-clip:text"
    },
    origin: {
      border: "background-origin:border-box",
      padding: "background-origin:padding-box",
      content: "background-origin:content-box"
    }
  },
  bgp: {
    _prop: "background-position:$",
    x: { _prop: "background-position-x:$" },
    y: { _prop: "background-position-y:$" }
  },
  c: {
    _prop: "color:$",
    _vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  accent: {
    _prop: "accent-color:$",
    _vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  caret: {
    _prop: "caret-color:$",
    _vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  over: {
    _prop: "overflow:$",
    x: {
      _prop: "overflow-x:$"
    },
    y: {
      _prop: "overflow-y:$"
    }
  },
  snap: {
    x: "scroll-snap-type:x mandatory",
    y: "scroll-snap-type:y mandatory",
    start: "scroll-snap-align:start",
    center: "scroll-snap-align:center",
    end: "scroll-snap-align:end",
    stop: "scroll-snap-stop: always"
  },
  shadow: {
    box: {
      _prop: "box-shadow:$",
      _one: "box-shadow:3px 4px 3px #0000004d",
      _unit: "px"
    },
    text: {
      _prop: "text-shadow:$",
      _one: "text-shadow:3px 4px 3px #0000004d",
      _unit: "px"
    }
  },
  cursor: {
    _prop: "cursor:$"
  },
  resize: {
    _prop: "resize:$",
    _vals: {
      x: "horizontal",
      y: "vertical"
    }
  },
  top: {
    _prop: "top:$",
    _unit: "px"
  },
  right: {
    _prop: "right:$",
    _unit: "px"
  },
  bottom: {
    _prop: "bottom:$",
    _unit: "px"
  },
  left: {
    _prop: "left:$",
    _unit: "px"
  },
  ratio: {
    _prop: function(e) {
      return `aspect-ratio:${this._vals?.[e.rawVal] || e.rawVal}`;
    },
    _vals: {
      sqr: "1 / 1",
      vid: "16 / 9"
    }
  },
  box: {
    _prop: "box-sizing:$",
    _vals: {
      content: "content-box",
      border: "border-box"
    },
    decoration: { _prop: "box-decoration-break:$" }
  },
  float: {
    _prop: "float:$"
  },
  clear: {
    _prop: "clear:$",
    _vals: {
      x: "horizontal",
      y: "vertical"
    }
  },
  z: {
    _prop: "z-index:$"
  },
  visible: "visibility:visible",
  invisible: "visibility:hidden",
  collapse: "visibility:collapse",
  opacity: {
    _prop: ({ val }) => `opacity:${val > 1 ? val / 100 : val}`
  },
  blend: {
    _prop: "mix-blend-mode:$"
  },
  hue: {
    _prop: "filter:hue-rotate($)",
    _unit: "deg"
  },
  invert: {
    _one: "filter:invert(1)",
    _prop: "filter:invert($)"
  },
  blur: {
    _prop: "filter:blur($)",
    _unit: "px"
  },
  brightness: {
    _prop: "filter:brightness($)"
  },
  contrast: {
    _prop: "filter:contrast($)"
  },
  saturate: {
    _prop: "filter:saturate($)"
  },
  grayscale: {
    _prop: "filter:grayscale($)",
    _unit: "%"
  },
  sepia: {
    _prop: "filter:sepia($)",
    _unit: "%"
  },
  isolate: "isolation:isolate",
  isolation: { _prop: "isolation:$" },
  pointer: "cursor:pointer",
  ws: {
    _prop: "white-space:$"
  },
  list: {
    _prop: "list-style:$",
    item: "display:list-item"
  },
  spacing: {
    _prop: "letter-spacing:$",
    _unit: "px"
  },
  fs: {
    _prop: "font-size:$",
    _unit: "px"
  },
  fsz: {
    _prop: "font-size:$",
    _unit: "px"
  },
  fst: {
    _prop: "font-style:$"
  },
  italic: "font-style:italic",
  fw: {
    _prop: "font-weight:$"
  },
  light: "font-weight:300",
  regular: "font-weight:400",
  medium: "font-weight:500",
  semibold: "font-weight:600",
  bold: "font-weight:700",
  extrabold: "font-weight:800",
  fv: {
    _prop: "font-variant:$"
  },
  ff: {
    _prop: "font-family:$",
    _vals: {
      sans: "var(--font-sans)",
      serif: "var(--font-serif)",
      mono: "var(--font-mono)"
    }
  },
  lh: {
    _prop: "line-height:$"
  },
  ta: {
    _prop: "text-align:$"
  },
  underline: "text-decoration:underline",
  td: {
    _prop: "text-decoration:$",
    _vals: {
      line: "underline"
    },
    _unit: "px"
  },
  wb: {
    _prop: "word-break:$",
    _vals: {
      all: "break-all",
      keep: "keep-all"
    }
  },
  break: {
    _prop: "word-break:$",
    _vals: {
      all: "break-all",
      keep: "keep-all"
    },
    after: { _prop: "break-after:$" },
    before: { _prop: "break-before:$" },
    inside: { _prop: "break-inside:$" }
  },
  grad: {
    _prop: "background:linear-gradient($)",
    _unit: "deg",
    _join: ","
  },
  fullscreen: "position:absolute;left:0;top:0;width:100%;height:100%",
  flex: {
    _one: "display:flex",
    _prop: "flex:$",
    _vals: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto"
    },
    center: "justify-content:center;align-items:center",
    col: {
      _one: "flex-direction:column",
      rev: "flex-direction:column-reverse"
    },
    row: {
      _one: "flex-direction:row",
      rev: "flex-direction:row-reverse"
    },
    space: "justify-content:space-between;align-items:center",
    evenly: "justify-content: space-evenly;align-items:center",
    around: "justify-content: space-around;align-items:center",
    wrap: {
      _one: "flex-wrap:wrap",
      rev: "flex-wrap:wrap-reverse"
    },
    nowrap: "flex-wrap:nowrap",
    stretch: "align-items:stretch"
  },
  col: {
    _one: "flex-direction:column",
    rev: "flex-direction:column-reverse",
    _prop: "grid-column:$",
    span: {
      _prop: "grid-column:span $ / span $",
      full: "grid-column:1 / -1"
    },
    start: { _prop: "grid-column-start:$" },
    end: { _prop: "grid-column-end:$" }
  },
  row: {
    _one: "flex-direction:row",
    rev: "flex-direction:row-reverse",
    _prop: "grid-row:$",
    span: {
      _prop: "grid-row:span $ / span $",
      full: "grid-row:1 / -1"
    },
    start: { _prop: "grid-row-start:$" },
    end: { _prop: "grid-row-end:$" }
  },
  flow: {
    _prop: "grid-auto-flow:$",
    _vals: {
      col: "column",
      "col-dense": "column dense",
      "row dense": "row dense"
    }
  },
  auto: {
    cols: {
      _prop: "grid-auto-columns:$",
      _vals: {
        min: "min-content",
        max: "max-content",
        fr: "minmax(0,1fr)"
      }
    },
    rows: {
      _prop: "grid-auto-rows:$",
      _vals: {
        min: "min-content",
        max: "max-content",
        fr: "minmax(0,1fr)"
      }
    }
  },
  gap: {
    _prop: "gap:$",
    _unit: "px",
    x: {
      _prop: "column-gap:$",
      _unit: "px"
    },
    y: {
      _prop: "row-gap:$",
      _unit: "px"
    }
  },
  jc: {
    _prop: "justify-content:$",
    _vals: c_vals
  },
  ji: {
    _prop: "justify-items:$",
    _vals: i_vals
  },
  js: {
    _prop: "justify-self:$",
    _vals: i_vals
  },
  ac: {
    _prop: "align-content:$",
    _vals: c_vals
  },
  ai: {
    _prop: "align-items:$",
    _vals: i_vals
  },
  as: {
    _prop: "align-self:$",
    _vals: i_vals
  },
  order: {
    _prop: "order:$",
    _vals: {
      first: "-9999",
      last: "9999",
      n_one: "0"
    }
  },
  basis: {
    _prop: "flex-basis:$"
  },
  grow: {
    _one: "flex-grow:1",
    _prop: "flex-grow:$"
  },
  shrink: {
    _one: "flex-shrink:1",
    _prop: "flex-shrink:$"
  },
  grid: {
    _one: "display:grid",
    cols: {
      _prop: "grid-template-columns:repeat($,1fr)"
    },
    rows: {
      _prop: "grid-template-rows:repeat($,1fr)"
    }
  },
  sw: {
    _prop: "stroke-width: $",
    _unit: "px"
  }
};
classes.object = classes.fit;
classes.overflow = classes.over;
classes.op = classes.opacity;
var class_default = classes;

// src/theme/attrs/flex.js
var c_vals2 = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  sb: "space-between",
  sa: "space-around",
  se: "space-evenly"
};
var i_vals2 = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  st: "stretch"
};
var flex_default = {
  _else: function(val) {
    if (+val[0]) {
      return [{ _prop: "gap:$", _unit: "px" }];
    }
  },
  col: {
    _one: "flex-direction:column",
    start: "flex-direction:column;align-items:flex-start",
    center: "flex-direction:column;align-items:center",
    end: "flex-direction:column;align-items:flex-end",
    rev: "flex-direction:column-reverse"
  },
  row: {
    _one: "flex-direction:row",
    start: "flex-direction:row;justify-content:flex-start",
    center: "flex-direction:row;justify-content:center",
    end: "flex-direction:row;justify-content:flex-end",
    rev: "flex-direction:row-reverse"
  },
  order: { _prop: "order:$1" },
  basis: { _prop: "flex-basis:$" },
  center: "justify-content:center;align-items:center",
  space: "justify-content:space-between;align-items:center",
  evenly: "justify-content: space-evenly;align-items:center",
  around: "justify-content: space-around;align-items:center",
  stretch: "align-items:stretch",
  grow: { _one: "flex-grow:1", _prop: "flex-grow:$" },
  shrink: { _one: "flex-shrink:1", _prop: "flex-shrink:$" },
  start: "justify-content: flex-start",
  end: "justify-content: flex-end",
  top: "align-items: flex-start",
  bottom: "align-items: flex-end",
  wrap: {
    _one: "flex-wrap:wrap",
    _prop: "flex-wrap:$",
    _vals: { rev: "wrap-reverse" }
  },
  jc: {
    _prop: "justify-content:$",
    _vals: c_vals2
  },
  ji: {
    _prop: "justify-items:$",
    _vals: i_vals2
  },
  ac: {
    _prop: "align-content:$",
    _vals: c_vals2
  },
  ai: {
    _prop: "align-items:$",
    _vals: i_vals2
  }
};

// src/theme/attrs/grid.js
var c_vals3 = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  sb: "space-between",
  sa: "space-around",
  se: "space-evenly"
};
var i_vals3 = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  st: "stretch"
};
var grid_default = {
  _else: function(val) {
    if (+val[0]) {
      return [{ _prop: "gap:$", _unit: "px" }];
    }
  },
  cols: {
    _prop: "grid-template-columns:repeat($,1fr)"
  },
  rows: {
    _prop: "grid-template-rows:repeat($,1fr)"
  },
  jc: {
    _prop: "justify-content:$",
    _vals: c_vals3
  },
  ji: {
    _prop: "justify-items:$",
    _vals: i_vals3
  },
  ac: {
    _prop: "align-content:$",
    _vals: c_vals3
  },
  ai: {
    _prop: "align-items:$",
    _vals: i_vals3
  }
};

// src/theme/attrs/text.js
var text_default = {
  _else: function(val) {
    if (val.includes("/")) {
      let [v1, v2] = val.split("/");
      if (+v1[0]) {
        return [
          { _prop: `font-size:$;font-weight:${v2}`, _unit: "px" },
          v1
        ];
      }
    } else {
      if (+val[0]) {
        return [{ _prop: "font-size:$", _unit: "px" }];
      }
    }
    return [{ _prop: "color:$" }];
  },
  nowrap: "white-space: nowrap",
  100: "font-weight:100",
  200: "font-weight:200",
  300: "font-weight:300",
  400: "font-weight:400",
  500: "font-weight:500",
  600: "font-weight:600",
  700: "font-weight:700",
  800: "font-weight:800",
  900: "font-weight:900",
  light: "font-weight:300",
  regular: "font-weight:400",
  medium: "font-weight:500",
  semibold: "font-weight:600",
  bold: "font-weight:700",
  extrabold: "font-weight:800",
  tp: "color:transparent!important",
  thin: "font-weight:lighter",
  normal: "font-weight:normal",
  bolder: "font-weight:bolder",
  italic: "font-style: italic",
  delete: "text-decoration-line:line-through",
  line: "text-decoration-line:underline",
  overline: "text-decoration-line:overline",
  up: "text-transform:uppercase",
  low: "text-transform:lowercase",
  cap: "text-transform:capitalize",
  center: "text-align:center",
  left: "text-align:left",
  right: "text-align:right",
  justify: "text-align:justify",
  mono: "font-family:var(--font-mono)",
  serif: "font-family:var(--font-serif)",
  sans: "font-family:var(--font-sans)",
  vertical: "writing-mode:vertical-lr",
  wrap: "word-wrap:break-word",
  dots: "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%",
  cols: { _prop: "columns:$", _unit: "" },
  lh: { _prop: "line-height:$", _unit: "" },
  wg: { _prop: "font-weight:$", _unit: "" },
  font: { _prop: "font-family:$", _unit: "" },
  align: { _prop: "vertical-align:$", _unit: "" },
  space: { _prop: "white-space:$", _unit: "" },
  shadow: {
    _one: "text-shadow:3px 3px 2px #0000004d",
    _prop: "text-shadow:$",
    _unit: "px"
  },
  stroke: {
    _prop: "-webkit-text-stroke:$",
    _unit: "px"
  },
  break: {
    _prop: "word-break:$",
    _vals: { all: "break-all", keep: "keep-all" },
    _unit: ""
  }
};

// src/theme/screen.js
var screen_default = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

// src/theme/states.js
var states_default = {
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
  "*": ` *`,
  every: `>*`,
  ">": `>*`,
  bt: `>*+*`,
  between: `>*+*`,
  aft: `::after`,
  bef: `::before`,
  after: `::after`,
  before: `::before`,
  dark: (selector) => `.dark ${selector}`
};

// src/theme/colors.js
var colors_default = {
  black: { def: "#000" },
  white: { def: "#fff" },
  gray: { def: "#6b7280", 1: "#f3f4f6", 2: "#d1d5db", 3: "#374151", 4: "#111827" },
  red: { def: "#ef4444", 1: "#fee2e2", 2: "#fca5a5", 3: "#b91c1c", 4: "#7f1d1d" },
  orange: { def: "#f97316", 1: "#ffedd5", 2: "#fdba74", 3: "#c2410c", 4: "#7c2d12" },
  yellow: { def: "#eab308", 1: "#fef9c3", 2: "#fde047", 3: "#a16207", 4: "#713f12" },
  lime: { def: "#84cc16", 1: "#ecfccb", 2: "#bef264", 3: "#4d7c0f", 4: "#365314" },
  green: { def: "#22c55e", 1: "#dcfce7", 2: "#86efac", 3: "#15803d", 4: "#14532d" },
  cyan: { def: "#06b6d4", 1: "#cffafe", 2: "#67e8f9", 3: "#0e7490", 4: "#164e63" },
  blue: { def: "#3b82f6", 1: "#dbeafe", 2: "#93c5fd", 3: "#1d4ed8", 4: "#1e3a8a" },
  purple: { def: "#a855f7", 1: "#f3e8ff", 2: "#d8b4fe", 3: "#7e22ce", 4: "#581c87" },
  pink: { def: "#ec4899", 1: "#fce7f3", 2: "#f9a8d4", 3: "#be185d", 4: "#831843" }
};

// src/theme/font.js
var font_default = {
  main: "system-ui,-apple-system,sans-serif",
  serif: "serif",
  mono: "monospace",
  sans: "sans-serif"
};

// src/theme/reset.js
var reset_default = `*,::after,::before{box-sizing:border-box;object-fit:cover;-webkit-tap-highlight-color:transparent;font-feature-settings:"pnum" on,"lnum" on;outline:0;border:0;margin:0;padding:0;border-style:solid;color:inherit}h1,h2,h3,h4,h5,h6{font-size:var(--fsz);font-weight:700;line-height:1.2}h1{--fsz:2.5rem}h2{--fsz:2rem}h3{--fsz:1.75rem}h4{--fsz:1.5rem}h5{--fsz:1.25rem}h6{--fsz:1rem}a{text-decoration:none}hr{width:100%;margin:20px 0;border-top:1px solid #aaa}ul[role="list"],ol[role="list"]{list-style:none}html:focus-within{scroll-behavior:smooth}body{text-rendering:optimizeSpeed;font-family:var(--font-main)}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;vertical-align:middle}input,button,textarea,select{font:inherit}[hidden]{display:none}option{color:#000;background-color:#fff}.theme-dark{background-color:#222}.theme-dark *{color:#eee}`;

// src/lib/check-type.js
var TYPES = {
  func: (e) => typeof e === "function",
  str: (e) => typeof e === "string",
  obj: (e) => typeof e === "object",
  num: (e) => typeof e === "number",
  arr: (e) => Array.isArray(e),
  var: (e) => /^\$.+/.test(e),
  hex: (e) => /^#[\dabcdef]{3,8}$/.test(String(e).trim()),
  exist: (e) => e !== void 0
};
var is = {
  ...TYPES,
  not: new Proxy(TYPES, {
    get(obj, key) {
      if (key in obj) {
        return (val) => !obj[key](val);
      } else {
        throw new Error(`BlickCss: type '${key}' don't exist`);
      }
    }
  })
};

// src/theme/funcs.js
var canvas;
var canvas_ctx;
if (typeof window !== "undefined") {
  canvas = document.createElement("canvas");
  canvas_ctx = canvas.getContext("2d");
}
function config(updates, source = this, isFirstCall = true) {
  if (!is.obj(updates)) {
    throw new Error(
      "Blick: The blick.config function must contain an object."
    );
  }
  for (let key in updates) {
    if (is.obj(updates[key]) && updates[key] !== null && !Array.isArray(updates[key])) {
      if (!source[key] || typeof source[key] == "string") {
        source[key] = {};
      }
      this.config(updates[key], source[key], false);
    } else {
      source[key] = updates[key];
    }
  }
  if (isFirstCall) {
  }
  return source;
}
function getHex(str) {
  if (!canvas) {
    throw Error("function getHex available only in browser");
  }
  canvas_ctx.fillStyle = str;
  return canvas_ctx.fillStyle;
}
function getVarColor(str) {
  if (!colors_default)
    return;
  if (is.var(str)) {
    str = str.slice(1);
  }
  const [colorName, shade] = str.split("-");
  if (shade) {
    if (colors_default[colorName][shade]) {
      return colors_default[colorName][shade];
    } else {
      throw Error(
        `Blick: This shade "${shade}" is not exist for "${colorName}".
Available shades: ${Object.keys(colors_default[colorName]).filter(
          (e) => e !== "def"
        )}`
      );
    }
  }
  return colors_default[colorName]?.def || colors_default[colorName]?.DEFAULT || colors_default[colorName];
}
function getHexAlpha(str) {
  str = +str;
  if (str < 0 || str > 100) {
    throw Error("Blick: Alpha value must be a from 0 to 100");
  }
  let shade = Math.round(str / 100 * 255).toString(16);
  if (shade.length === 1) {
    shade = "0" + shade;
  }
  return shade;
}
var funcs_default = {
  config,
  getHex,
  getVarColor,
  getHexAlpha
};

// src/lib/format-selector.js
function format_selector_default(str, model = "class") {
  let format = str;
  format = format.replace(/[^\w-_]/g, "\\$&").replace(/^\d/, "\\3$& ");
  if (model === "raw")
    return format;
  return model === "class" ? `.${format}` : `[${model}~="${str}"]`;
}

// src/lib/create-media-width.js
function createMediaWidth(sizes) {
  if (!is.obj(sizes))
    sizes = [sizes];
  const WIDTHS = [];
  for (const index in sizes) {
    let size = sizes[index];
    if (!size)
      continue;
    size = size.toString().replace(/\(|\)/g, "");
    if (+size[0]) {
      let type = +index === 0 ? "min" : "max";
      let unit = +size ? "px" : "";
      WIDTHS.push(`(${type}-width:${size}${unit})`);
    } else {
      WIDTHS.push(`(${size})`);
    }
  }
  return WIDTHS.join(" and ");
}

// src/lib/parser/parse-media.js
function parseMedia(str) {
  if (!str)
    throw new Error(`value is required, (${str})`);
  if (str.startsWith(theme_default.maxPrefix)) {
    str = str.slice(theme_default.maxPrefix.length);
    return createMediaWidth([null, theme_default.screen[str] || str]);
  }
  return createMediaWidth(theme_default.screen[str] || str);
}

// src/lib/parser/parse-states.js
function parseStates(state, attr) {
  const IS_IN_ARR = state in theme_default.screen;
  const IS_MAX_WD = state.startsWith(theme_default.maxPrefix);
  const IS_NUMBER = +state;
  let raw = state;
  let val = null;
  let type = null;
  if (IS_IN_ARR || IS_NUMBER || IS_MAX_WD) {
    val = parseMedia(state);
    type = "media";
  } else {
    if (raw.startsWith("&")) {
      val = raw.slice(1);
    } else {
      val = theme_default.states[raw] || ":" + raw;
    }
    if (is.str(val)) {
      val = val.replace(/(?<!\\)_/g, " ");
    }
    type = "pseudo";
  }
  return { raw, val, type };
}

// src/lib/parser/parse-rule.js
function parseRule(path2, object) {
  const PARTS = path2.split(/(?<!\\)-/g);
  let array_path = [];
  let value_string = null;
  for (const i in PARTS) {
    if (!object[PARTS[i]]) {
      if (i == 0)
        object = null;
      value_string = PARTS.slice(i).join("-");
      break;
    }
    array_path.push(PARTS[i]);
    object = object[PARTS[i]];
  }
  return {
    path: array_path,
    value: value_string,
    source: object
  };
}

// src/lib/parser/parse-value.js
function createColor(color, opacity) {
  if (theme_default._COLOR_) {
    return theme_default._COLOR_(color, opacity);
  }
  return getHex(color) + getHexAlpha(opacity);
}
function createVar(variable, opacity = "") {
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
function getItem(item = "", source = {}) {
  const [first, second] = item.replaceAll("\\", "").split("/");
  const UNIT = source?._unit || "";
  if (!first)
    return;
  if (second && +second) {
    if (+first) {
      return +(first / second * 100).toFixed(2) + "%";
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
function parseValue(value = "", source = {}) {
  if (!value)
    return null;
  return value.split(/(?<!\\)\+/g).map((item) => {
    return {
      val: source._vals?.[item] ?? getItem(item, source).replace(/\\/g, ""),
      raw: item
    };
  });
}

// src/lib/parser/parse-styles.js
function parseStyles(style, attr) {
  let object = theme_default.attr[attr] || theme_default.class;
  let property = null;
  let values = null;
  let { source, path: path2, value } = parseRule(style, object);
  if (!source && attr !== "class") {
    let [s, v] = theme_default.attr[attr]._else(style) || [null, null];
    source = s;
    value = v || style;
  }
  if (!source)
    return;
  if (value) {
    property = source._prop;
    values = parseValue(value, source);
  } else {
    property = source._one || source;
  }
  if (!property || typeof property !== "string") {
    return null;
  }
  return {
    src: source,
    path: path2,
    prop: property,
    values,
    rawVal: value,
    val: values?.map((e) => e.val).join(source._join || " ") || null,
    unit: source._unit || "",
    join: source._join || " "
  };
}

// src/lib/parser/index.js
function parser(token = "", attr = "class") {
  let [styles, ...states] = token.split(/(?<!\\):/g).reverse();
  let selector = format_selector_default(token, attr);
  let rawSelector = selector;
  states = states.map((e) => parseStates(e, attr));
  styles = styles.split(/(?<!\\);/g);
  styles = styles.map((e) => parseStyles(e, attr));
  styles = styles.filter((e) => e);
  if (!states.length) {
    states = null;
  }
  if (styles.length) {
    const EXTRA_SELECTOR = styles[0].src?._selector;
    if (EXTRA_SELECTOR && is.str(EXTRA_SELECTOR)) {
      selector = EXTRA_SELECTOR.replace(/\$/g, selector);
    }
    return { states, styles, attr, selector, rawSelector, token };
  }
  return null;
}

// src/lib/create-rule.js
function createRule(token, attr) {
  const STRUCT = parser(token, attr);
  if (!STRUCT)
    return null;
  const MEDIA = [];
  const DECLARED = [];
  if (STRUCT.states) {
    for (let i = STRUCT.states.length - 1; i >= 0; i--) {
      const state = STRUCT.states[i];
      if (state.type === "pseudo") {
        if (is.func(state.val)) {
          STRUCT.selector = state.val(STRUCT.selector);
        } else if (state.val?.includes("$")) {
          STRUCT.selector = state.val.replace("$", STRUCT.selector);
        } else {
          STRUCT.selector += state.val;
        }
      } else if (state.type === "media") {
        MEDIA.push(state);
      }
    }
  }
  for (const rule of STRUCT.styles) {
    let style = rule.prop;
    if (is.func(rule.prop)) {
      style = rule.prop(rule) || "";
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
  const STYLE = DECLARED.join(";").replace(/(?<!\\)_/g, " ");
  return [MEDIA, `${STRUCT.selector}{${STYLE}}`];
}

// src/store.js
var B_STYLE_STORE = /* @__PURE__ */ Object.create(null);
var B_ATTRS_STORE = /* @__PURE__ */ Object.create(null);
var B_MEDIA_STORE = /* @__PURE__ */ Object.create(null);
var B_CSS_STORE = /* @__PURE__ */ Object.create(null);
B_CSS_STORE.MEDIA = {};
var _STORE_ = {
  B_STYLE_STORE,
  B_ATTRS_STORE,
  B_MEDIA_STORE,
  B_CSS_STORE
};
var store_default = _STORE_;

// src/style-tag.js
var B_STYLE_TAG = {
  textContent: ""
};
if (typeof window !== "undefined") {
  B_STYLE_TAG = document.createElement("style");
  B_STYLE_TAG.id = "BLICK_OUTPUT";
  document.head.append(B_STYLE_TAG);
}
var style_tag_default = B_STYLE_TAG;

// version.js
var version_default = "2.0";

// src/theme/index.js
var BLICK = {
  class: class_default,
  screen: screen_default,
  states: states_default,
  colors: colors_default,
  font: font_default,
  reset: reset_default,
  attr: {
    flex: flex_default,
    grid: grid_default,
    text: text_default
  },
  autoTheme: false,
  beautify: false,
  autoFlex: true,
  useAttr: true,
  time: false,
  root: true,
  wrapper: ".wrapper",
  maxPrefix: "m-",
  beautifyOption: {},
  version: version_default,
  is,
  parser,
  _STORE_: store_default,
  style_tag: style_tag_default,
  createRule,
  ...funcs_default
};
var theme_default = BLICK;

// src/lib/create-root.js
function create_root_default() {
  let fonts = "";
  let colors = "";
  for (const type in theme_default?.font) {
    fonts += `--font-${type}:${theme_default.font[type]};`;
  }
  for (const color in theme_default?.colors) {
    if (is.str(theme_default.colors[color])) {
      colors += `--${color}:${theme_default.colors[color]};`;
      continue;
    }
    for (const num in theme_default.colors[color]) {
      colors += `--${color + (num === "def" ? "" : "-" + num)}:${theme_default.colors[color][num]};`;
    }
  }
  return `:root{${colors + fonts}}`;
}

// src/lib/create-css.js
function create_css_default(root2) {
  let media_str = "";
  let css_str = "";
  let CSS = theme_default._STORE_.B_CSS_STORE;
  for (const attr in CSS) {
    if (attr === "MEDIA") {
      for (const md in CSS.MEDIA) {
        let aaa = "";
        aaa += CSS.MEDIA[md];
        media_str += `@media ${md} {
${aaa}}
`;
      }
      continue;
    }
    css_str += CSS[attr] + "\n";
  }
  return `/* ! blickcss v${theme_default.version} | MIT License | https://github.com/ghtx280/blickcss */

` + (theme_default.reset ? theme_default.reset : "") + (theme_default.root ? root2 : "") + (theme_default.wrapper ? `${theme_default.wrapper}{display:block;width:100%;margin:0 auto;padding-left:var(--wrapper-padding,15px);padding-right:var(--wrapper-padding,15px)}` : "") + (theme_default.useAttr ? `[flex]{display:flex}[grid]{display:grid}` : "") + (theme_default.autoFlex ? '[class*="flex-"],[class*="jc-"],[class*="ai-"],[class*="gap-"]{display:flex}' : "") + css_str + media_str;
}

// src/lib/prerender.js
function prerender_default() {
  if (!theme_default.dark) {
    theme_default.dark = theme_default.states.dark("").trim();
  }
  if (typeof window !== void 0) {
    if (theme_default.autoTheme && matchMedia("(prefers-color-scheme: dark)").matches) {
      if (theme_default.dark.startsWith(".")) {
        document.documentElement.classList.add(theme_default.dark.slice(1));
      } else if (theme_default.dark.startsWith("#")) {
        document.documentElement.id = theme_default.dark.slice(1);
      } else if (theme_default.dark.startsWith("[") && theme_default.dark.endsWith("]")) {
        document.documentElement.setAttribute(theme_default.dark.slice(1, -1));
      }
    }
  }
  if (theme_default.wrapper) {
    for (const scr in theme_default.screen) {
      let size = theme_default.screen[scr];
      theme_default._STORE_.B_CSS_STORE.MEDIA[parseMedia(scr)] = theme_default.wrapper + `{max-width:${is.num(size) ? size : size[0]}px}`;
    }
  }
}

// src/lib/timer.js
function timer(label) {
  const startTime = performance.now();
  return {
    stop: function() {
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      console.log(`${label}: ${elapsedTime.toFixed(1)}ms`);
    }
  };
}

// src/lib/helpers.js
function getTruthyKeys2(obj) {
  if (typeof obj !== "object") {
    return [];
  }
  const entries = Object.entries(obj);
  const filtered = entries.filter(([key, val]) => val);
  return filtered.map(([key, val]) => key);
}

// src/lib/check-record.js
var ATTRS = ["class", ...getTruthyKeys2(theme_default.attr)];

// src/lib/render.js
var once;
var root;
function render_default(record, params = {}) {
  const AS = theme_default._STORE_.B_ATTRS_STORE;
  const SS = theme_default._STORE_.B_STYLE_STORE;
  const MS = theme_default._STORE_.B_MEDIA_STORE;
  const CS = theme_default._STORE_.B_CSS_STORE;
  const TIMER = timer("Blick: Styles updated");
  const ATTRS2 = ["class", ...getTruthyKeys2(theme_default.attr)];
  const NODES = params.NODES || document.querySelectorAll(ATTRS2.map((e) => `[${e}]`).join());
  if (!once || theme_default._CLI_) {
    root = create_root_default();
    prerender_default();
    once = true;
  }
  let is_style_updated;
  NODES.forEach((node) => {
    for (const attr of ATTRS2) {
      let ATTR_VALUE = node.getAttribute(attr);
      if (is.str(ATTR_VALUE))
        ATTR_VALUE = ATTR_VALUE.trim();
      if (!ATTR_VALUE)
        continue;
      for (const token of ATTR_VALUE.trim().split(/\s+/g)) {
        if (!(attr in CS))
          CS[attr] = "";
        if (!(attr in SS))
          SS[attr] = /* @__PURE__ */ Object.create(null);
        if (!(attr in AS))
          AS[attr] = /* @__PURE__ */ Object.create(null);
        if (token in SS[attr])
          continue;
        if (token in AS[attr])
          continue;
        AS[attr][token] = true;
        const [MEDIA, RULE] = createRule(token, attr) || [[], ""];
        if (!RULE) {
          SS[attr][token] = null;
          continue;
        }
        if (MEDIA.length) {
          for (const m of MEDIA) {
            if (!(m.raw in MS))
              MS[m.raw] = /* @__PURE__ */ Object.create(null);
            if (!(m.val in CS.MEDIA))
              CS.MEDIA[m.val] = "";
            if (token in MS[m.raw])
              continue;
            MS[m.raw][token] = RULE;
            CS.MEDIA[m.val] += RULE + "\n";
          }
        } else {
          SS[attr][token] = RULE;
          CS[attr] += RULE + "\n";
        }
        is_style_updated = true;
      }
    }
  });
  if (is_style_updated) {
    style_tag_default.textContent = create_css_default(root);
    if (theme_default.time)
      TIMER.stop();
  }
  return style_tag_default.textContent;
}

// src/node/funcs/make-hex.js
function make_hex_default(color, opacity) {
  const color_names = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  };
  const rgbToHex = (r = "0", g = "0", b = "0") => "#" + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
  opacity = opacity ? getHexAlpha(opacity) : "";
  if (color[0] === "#") {
    if (color.length === 4) {
      let r = color[1];
      let g = color[2];
      let b = color[3];
      return "#" + r + r + g + g + b + b + opacity;
    } else {
      return color + opacity;
    }
  } else if (color.startsWith("rgb")) {
    let [r, g, b, a] = color.match(/\((.+)\)/)[1].trim().split(/\s*,\s*/);
    if (a) {
      return color;
    } else {
      return rgbToHex(r, g, b) + opacity;
    }
  } else {
    if (!color_names[color]) {
      throw new SyntaxError(`Invalid color "${color}"`);
    }
    return color_names[color] + opacity;
  }
}

// src/node/default-config.js
var default_config_default = (
  /*js*/
  `
import { config } from "blickcss2"

export default config({
    
    input: './src/**/*.html', // Your input files by glob pattern
    output: './src/output.css', // File in which css will be generated

    // your configurations

    beautify: true, // For beautify css code
    watch: true, // For watching changing the input files and rebuilding

    // Uncomment the code below so that only your classes are created
    // reset: false,
    // root: false,
    // wrapper: false,
    // autoFlex: false,
    // useAttr: false,
})
`
);

// src/node/funcs/is-module.js
import { readFileSync } from "fs";
import { resolve } from "path";
function isModule() {
  try {
    const path2 = resolve("package.json");
    const content = readFileSync(path2, "utf-8");
    const json = JSON.parse(content);
    return json.type === "module";
  } catch (error) {
    return null;
  }
}

// src/node/funcs/deep-clone.js
function deepClone(obj) {
  if (obj === null || typeof obj !== "object" || typeof obj === "function") {
    return obj;
  }
  if (Array.isArray(obj)) {
    const clonedArray = obj.map((e) => deepClone(e));
    return clonedArray;
  }
  const clonedObj = {};
  for (let key in obj) {
    clonedObj[key] = deepClone(obj[key]);
  }
  return clonedObj;
}

// src/node/funcs/cssbeautify.js
function cssbeautify(style = "", options = {
  indent: "    ",
  openbrace: "end-of-line",
  autosemicolon: true
}) {
  let index = 0;
  let length = style.length;
  let blocks;
  let formatted = "";
  let ch;
  let ch2;
  let str;
  let state;
  let State;
  let depth;
  let quote;
  let comment;
  let openbracesuffix = true;
  let autosemicolon = false;
  let trimRight;
  openbracesuffix = options.openbrace === "end-of-line";
  autosemicolon = options.autosemicolon;
  function isWhitespace(c) {
    return c === " " || c === "\n" || c === "	" || c === "\r" || c === "\f";
  }
  function isQuote(c) {
    return c === "'" || c === '"';
  }
  function isName(c) {
    return ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch >= "0" && ch <= "9" || "-_*.:#[]".indexOf(c) >= 0;
  }
  function appendIndent() {
    var i;
    for (i = depth; i > 0; i -= 1) {
      formatted += options.indent;
    }
  }
  function openBlock() {
    formatted = trimRight(formatted);
    if (openbracesuffix) {
      formatted += " {";
    } else {
      formatted += "\n";
      appendIndent();
      formatted += "{";
    }
    if (ch2 !== "\n") {
      formatted += "\n";
    }
    depth += 1;
  }
  function closeBlock() {
    var last;
    depth -= 1;
    formatted = trimRight(formatted);
    if (formatted.length > 0 && autosemicolon) {
      last = formatted.charAt(formatted.length - 1);
      if (last !== ";" && last !== "{") {
        formatted += ";";
      }
    }
    formatted += "\n";
    appendIndent();
    formatted += "}";
    blocks.push(formatted);
    formatted = "";
  }
  if (String.prototype.trimRight) {
    trimRight = function(s) {
      return s.trimRight();
    };
  } else {
    trimRight = function(s) {
      return s.replace(/\s+$/, "");
    };
  }
  State = {
    Start: 0,
    AtRule: 1,
    Block: 2,
    Selector: 3,
    Ruleset: 4,
    Property: 5,
    Separator: 6,
    Expression: 7,
    URL: 8
  };
  depth = 0;
  state = State.Start;
  comment = false;
  blocks = [];
  style = style.replace(/\r\n/g, "\n");
  while (index < length) {
    ch = style.charAt(index);
    ch2 = style.charAt(index + 1);
    index += 1;
    if (isQuote(quote)) {
      formatted += ch;
      if (ch === quote) {
        quote = null;
      }
      if (ch === "\\" && ch2 === quote) {
        formatted += ch2;
        index += 1;
      }
      continue;
    }
    if (isQuote(ch)) {
      formatted += ch;
      quote = ch;
      continue;
    }
    if (comment) {
      formatted += ch;
      if (ch === "*" && ch2 === "/") {
        comment = false;
        formatted += ch2;
        index += 1;
      }
      continue;
    }
    if (ch === "/" && ch2 === "*") {
      comment = true;
      formatted += ch;
      formatted += ch2;
      index += 1;
      continue;
    }
    if (state === State.Start) {
      if (blocks.length === 0) {
        if (isWhitespace(ch) && formatted.length === 0) {
          continue;
        }
      }
      if (ch <= " " || ch.charCodeAt(0) >= 128) {
        state = State.Start;
        formatted += ch;
        continue;
      }
      if (isName(ch) || ch === "@") {
        str = trimRight(formatted);
        if (str.length === 0) {
          if (blocks.length > 0) {
            formatted = "\n\n";
          }
        } else {
          if (str.charAt(str.length - 1) === "}" || str.charAt(str.length - 1) === ";") {
            formatted = str + "\n\n";
          } else {
            while (true) {
              ch2 = formatted.charAt(formatted.length - 1);
              if (ch2 !== " " && ch2.charCodeAt(0) !== 9) {
                break;
              }
              formatted = formatted.substr(
                0,
                formatted.length - 1
              );
            }
          }
        }
        formatted += ch;
        state = ch === "@" ? State.AtRule : State.Selector;
        continue;
      }
    }
    if (state === State.AtRule) {
      if (ch === ";") {
        formatted += ch;
        state = State.Start;
        continue;
      }
      if (ch === "{") {
        str = trimRight(formatted);
        openBlock();
        state = str === "@font-face" ? State.Ruleset : State.Block;
        continue;
      }
      formatted += ch;
      continue;
    }
    if (state === State.Block) {
      if (isName(ch)) {
        str = trimRight(formatted);
        if (str.length === 0) {
          if (blocks.length > 0) {
            formatted = "\n\n";
          }
        } else {
          if (str.charAt(str.length - 1) === "}") {
            formatted = str + "\n\n";
          } else {
            while (true) {
              ch2 = formatted.charAt(formatted.length - 1);
              if (ch2 !== " " && ch2.charCodeAt(0) !== 9) {
                break;
              }
              formatted = formatted.substr(
                0,
                formatted.length - 1
              );
            }
          }
        }
        appendIndent();
        formatted += ch;
        state = State.Selector;
        continue;
      }
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        continue;
      }
      formatted += ch;
      continue;
    }
    if (state === State.Selector) {
      if (ch === "{") {
        openBlock();
        state = State.Ruleset;
        continue;
      }
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        continue;
      }
      formatted += ch;
      continue;
    }
    if (state === State.Ruleset) {
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        if (depth > 0) {
          state = State.Block;
        }
        continue;
      }
      if (ch === "\n") {
        formatted = trimRight(formatted);
        formatted += "\n";
        continue;
      }
      if (!isWhitespace(ch)) {
        formatted = trimRight(formatted);
        formatted += "\n";
        appendIndent();
        formatted += ch;
        state = State.Property;
        continue;
      }
      formatted += ch;
      continue;
    }
    if (state === State.Property) {
      if (ch === ":") {
        formatted = trimRight(formatted);
        formatted += ": ";
        state = State.Expression;
        if (isWhitespace(ch2)) {
          state = State.Separator;
        }
        continue;
      }
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        if (depth > 0) {
          state = State.Block;
        }
        continue;
      }
      formatted += ch;
      continue;
    }
    if (state === State.Separator) {
      if (!isWhitespace(ch)) {
        formatted += ch;
        state = State.Expression;
        continue;
      }
      if (isQuote(ch2)) {
        state = State.Expression;
      }
      continue;
    }
    if (state === State.Expression) {
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        if (depth > 0) {
          state = State.Block;
        }
        continue;
      }
      if (ch === ";") {
        formatted = trimRight(formatted);
        formatted += ";\n";
        state = State.Ruleset;
        continue;
      }
      formatted += ch;
      if (ch === "(") {
        if (formatted.charAt(formatted.length - 2) === "l" && formatted.charAt(formatted.length - 3) === "r" && formatted.charAt(formatted.length - 4) === "u") {
          state = State.URL;
          continue;
        }
      }
      continue;
    }
    if (state === State.URL) {
      if (ch === ")" && formatted.charAt(formatted.length - 1 !== "\\")) {
        formatted += ch;
        state = State.Expression;
        continue;
      }
    }
    formatted += ch;
  }
  formatted = blocks.join("") + formatted;
  return formatted;
}

// src/node/funcs/process-file.js
import fs from "fs";

// src/node/funcs/create-attr-regexp.js
function createAttrRegexp(attr = "class") {
  attr = attr == "class" ? "(?:class|className)" : attr;
  const REGEXP = `${attr}\\s*=\\s*(["'\`])(.*?)\\1`;
  const FLAGS = "g";
  return new RegExp(REGEXP, FLAGS);
}

// src/node/funcs/process-file.js
function processFile(file, attrs) {
  const html = fs.readFileSync(file, "utf-8");
  if (!file) {
    return console.error("BlickCss: File error");
  }
  const NODE = {
    getAttribute: function(token) {
      return this[token];
    }
  };
  for (const attr of attrs) {
    const ATTR_REGEXP = createAttrRegexp(attr);
    const MATCHES = html.matchAll(ATTR_REGEXP);
    const MATCHES_ARR = [...MATCHES];
    NODE[attr] = MATCHES_ARR.map((e) => e[2]).join(" ");
  }
  return NODE;
}

// src/node/funcs/show-msg.js
var times = 1;
function showMsg(file, params) {
  const STACK = [];
  const date = /* @__PURE__ */ new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  STACK.push(`[${h}:${m}:${s}] Number of updates: ${times++}`);
  STACK.push(`-------------------`);
  if (file) {
    let upd_file = file.replaceAll("\\", "/");
    STACK.push(`'${upd_file}' was changed.`);
  }
  if (params.output) {
    let out_file = params.output.replaceAll(/\.+\//g, "");
    STACK.push(`'${out_file}' updated successfully.`);
  }
  STACK.push(`-------------------`);
  if (params.watch) {
    STACK.push(`Waiting for changes...`);
  }
  console.log(`
${STACK.join("\n")}
`);
}

// src/node/funcs/node-helpers.js
import fs2 from "fs";
function mkdirIfNotExist(path2) {
  if (!fs2.existsSync(path2)) {
    fs2.mkdirSync(path2, { recursive: true });
    return true;
  }
  return false;
}
function writeFileIfNotExist(path2, content) {
  if (!fs2.existsSync(path2)) {
    fs2.writeFileSync(path2, content);
    return true;
  }
  return false;
}

// src/node/index.js
console.log("\n================BlickCss================\n");
try {
  const DIR = path.dirname(url.fileURLToPath(import.meta.url));
  const CWD = process.cwd();
  const CONFIG_FILE_NAME = `blick.config.${!isModule() ? "m" : ""}js`;
  const CONFIG_FILE_PATH = path.resolve(CONFIG_FILE_NAME);
  const CONFIG_FILE_PATH_REL = path.relative(DIR, CONFIG_FILE_PATH);
  const STORE_COPY = deepClone(theme_default._STORE_);
  const BLICK_COPY = deepClone(theme_default);
  theme_default._COLOR_ = make_hex_default;
  theme_default._CLI_ = true;
  async function filesUpdate(updatedFile) {
    theme_default._STORE_ = deepClone(STORE_COPY);
    const FILES = fg.sync(theme_default.input);
    const ATTRS2 = ["class", ...getTruthyKeys(theme_default.attr)];
    const NODES = [];
    for (const file of FILES) {
      NODES.push(processFile(file, ATTRS2));
    }
    let CSS = render_default(null, { NODES });
    if (theme_default.beautify) {
      CSS = cssbeautify(CSS);
    }
    mkdirIfNotExist(path.dirname(theme_default.output));
    fs3.writeFile(theme_default.output, CSS, (err) => {
      if (err) {
        return console.error(`BlickCss: Error writing file`, err);
      }
      showMsg(updatedFile, theme_default);
    });
  }
  async function handleConfigUpdate() {
    const PATH = `./${CONFIG_FILE_PATH_REL}?update=${Date.now()}`;
    const CONFIG = await import(PATH);
    theme_default.config({ ...BLICK_COPY, ...CONFIG.default });
    filesUpdate();
  }
  ;
  async function main() {
    writeFileIfNotExist(CONFIG_FILE_PATH, default_config_default);
    await handleConfigUpdate();
    chokidar.watch(CONFIG_FILE_PATH).on("change", handleConfigUpdate);
    if (theme_default.watch) {
      chokidar.watch(theme_default.input).on("change", (filePath) => {
        filesUpdate(filePath);
      });
    }
  }
  main();
} catch (error) {
  console.log(error);
}
