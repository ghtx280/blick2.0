module.exports = {
  input: "./src/**/test3.html", // Your input files by glob pattern
  output: "./src/output.css",    // File in which css will be generated

  // your configurations
  reset: false,
  root: false,
  autoFlex: false,
  useAttr: false,
  wrapper: false,

  colors: {
    foo: "#37974c"
  },

  // beautify: true, // For beautify css code
  watch: true, // For watching changing the input files and rebuilding

  server: false,
  // If you need a live preview server, uncomment the code below
  // server: {
  //   open: true
  // }

  // beforeUpdate: function(css) {
  //   return css.replace(/\[flex\]{.*?}/sg, "");
  // }
}
