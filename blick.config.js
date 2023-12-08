
import blick, { config } from "./index.js"

export default config({
    
    input: './src/**/test3.html', // Your input files by glob pattern
    output: './src/output.css', // File in which css will be generated

    class: {
        foo: {
            _prop: "font-size: $",
            _unit: "px"
        },
        m: {
            _prop: "margin:  $1;   color:  red",
            _unit: "rem"
        }
        
    },

    attr: {
        // foo: {
        //     _else(e){
        //         console.log(e);
        //         return {
        //             _prop: "font-size: $",
        //             _unit: "px"
        //         }
        //     },
        //     red: {
        //         _prop: "color: $",
        //         _unit: "px"
        //     },
        //     bold: "text-bold"
        // }
    },

    // your configurations

    beautify: true, // For beautify css code
    watch: true, // For watching changing the input files and rebuilding

    // Uncomment the code below so that only your classes are created
    reset: false,
    root: false,
    wrapper: false,
    autoFlex: false,
    useAttr: false,
})
