#!/usr/bin/env node

import fs from "fs";
import color from "./funcs/make-hex.js";
import chokidar from "chokidar";
import { glob } from "glob";
import beautify from "js-beautify";
import liveServer from "live-server";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "node:module";

import BLICK  from "../theme";
import B_RENDER from "../funcs/render.js";
import * as _STORE_ from "../store.js";
import defalut_config from "./default-config.js";

import { getRelPathSync } from "./funcs/rel-path.js";
import { getProjectType } from "./funcs/proj-type.js";

const root = process.cwd();
const requireSync = createRequire(import.meta.url);
const config_file_path = path.resolve(
  `blick.config.${ getProjectType("module") ? "c" : "" }js`
);


// let config = {
//   input: "./src/**/*.{html,js}",
//   output: "./src/output.css",
//   beautify: true,
//   watch: true,
// };

(async function () {

  if (!config_file_path) {
    fs.writeFileSync(config_file_path, defalut_config);
  }

  const store_copy = { ..._STORE_ }
  

  blick._STORE_ = store_copy;
  blick._COLOR_ = color;
  blick._CLI_ = true;

  const blick_copy = { ...blick };

  let cli_config = {}
  let usr_config = {}

  const foo = () => {
    delete requireSync.cache[config_file_path];
    // config = {...config, ...requireSync(config_file_path)}
    blick.config({...blick_copy, ...requireSync(config_file_path)});
    processHTMLFiles();
  }
  foo()

  chokidar.watch(config_file_path).on("change", foo);
  
  if (blick.server) {
    liveServer.start({
      port: blick.server?.port ?? 3500,
      host: blick.server?.host ?? "0.0.0.0",
      root: blick.server?.root ?? (fs.existsSync(`${root}/src`) ? `${root}/src` : root),
      open: blick.server?.open ?? true,
      logLevel: blick.server?.logLevel ?? 0,
      wait: blick.server?.wait ?? 0,
    });
  }

  const filesText = {};

  async function processHTMLFiles(updatedFile) {
    blick._STORE_ = structuredClone(store_copy);

    const files = await glob(blick.input);

    for (const file of files) {
      const data = fs.readFileSync(file, "utf-8");

      if (!file) return console.error("file error");

      const unique = (e) => Array.from(new Set(e));

      const attrsValue = {};

      const f_regex_attr = (e) =>
        new RegExp(
          `\\s${blick.attr[e] || "(?:class|className)"}\\s*=\\s*["'\`](.*?)["'\`]`,
          "g"
        );

      const regexParser = {
        class: f_regex_attr("class"),
        text: f_regex_attr("text"),
        flex: f_regex_attr("flex"),
        grid: f_regex_attr("grid"),
      };

      for (const attr in regexParser) {
        const matches = data.matchAll(regexParser[attr]);
        attrsValue[attr] = [];
        for (const match of matches) {
          const arrVals = match[1].trim().split(/\s+/g);
          attrsValue[attr].push(...arrVals);
        }
        attrsValue[attr] = unique(attrsValue[attr]);
      }
      filesText[file] = attrsValue;
    }

    const values = Object.values(filesText);

    const all = {
      class: [],
      text: [],
      flex: [],
      grid: [],
    };

    for (const item of values) {
      for (const key in all) {
        all[key].push(...item[key]);
      }
    }

    let css = B_RENDER(all, { cli: true });

    if (blick.beautify) {
      css = beautify.css(css, {
        indent_size: 2,
      });
    }

    const outputDir = dirname(blick.output);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFile(blick.output, css, (err) => {
      if (err) {
        console.error(`Error writing file`, err);
      } else {
        console.log(
          `\n${
            updatedFile
              ? `'${updatedFile.replaceAll("\\", "/")}' was changed.\n`
              : ""
          }'${blick.output.replaceAll(/\.+\//g, "")}' updated successfully. ${
            blick.watch ? "\nWaiting for change..." : ""
          }`
        );
      }
    });
  }

  if (blick.watch) {
    chokidar.watch(blick.input).on("change", (filePath) => {
      processHTMLFiles(filePath);
    });
  }
})();
