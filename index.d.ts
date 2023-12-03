// import theme from "./src/theme/index.js";
// import { config } from "./src/cli/funcs/config.js";

import { theme, config } from "./index.js";

declare module "blickcss2" {
    export {
        theme,
        config
    }
}