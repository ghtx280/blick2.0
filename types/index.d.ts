// import { BLICK } from "../src/theme/index.js"
// const config = (obj = BLICK) => obj
// const theme = BLICK

import { theme, config } from "../index.js"

declare module "blickcss2" {
    export {
        theme,
        config
    }
}