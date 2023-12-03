// import { config } from "blickcss2/src/cli/funcs/config.js";



export default /*js*/`
    const { config } = require('blickcss2');

    module.exports = {
        input: './src/*.html', // Your input files by glob pattern
        output: './src/output.css', // File in which css will be generated

        // your configurations

        beautify: true, // For beautify css code
        watch: true, // For watching changing the input files and rebuilding

        reset: false,
        root: false,
        wrapper: false,
        autoFlex: false,

        server: false,
        // If you need a live preview server, uncomment the code below
        // server: {
        //     open: true, // Open the browser after server start
        //     port: 6050, // Port on which the server will start
        //     host: '0.0.0.0', // Host on which the server will start
        //     root: '/src', // Root directory from which the server will serve files
        //     logLevel: 0, // 0 = errors only, 1 = some, 2 = lots of information
        //     wait: 0, // Time in milliseconds before page refresh
        // },
    }
`
