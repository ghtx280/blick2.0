#!/usr/bin/env node

console.log('\n\n================BlickCss================\n\n');

import fs from 'fs';
import chokidar from 'chokidar';
import fg from 'fast-glob';
// import liveServer from 'live-server';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';

import BLICK  from '../theme/index.js';
import RENDER from '../funcs/render.js';
import COLOR  from './funcs/make-hex.js';
import defalut_config from './default-config.js';


import { isModule  } from './funcs/is-module.js';
import { deepClone } from './funcs/deep-clone.js';
import { cssbeautify } from './funcs/cssbeautify.js';

const dir = dirname(fileURLToPath(import.meta.url));
const req = createRequire(import.meta.url);
const cwd = process.cwd();

const config_file_path = path.resolve(
    `blick.config.${isModule() ? 'c' : ''}js`
)

// const defalut_config = fs.readFileSync(dir + '/default-config.js', 'utf-8');

function getAttribute(token) {
    return this[token];
}

function unique(list) {
    return Array.from(new Set(list));
}

function createAttrRegexp(attr) {
    if (attr === 'class') attr = null;

    return new RegExp(
        `${attr || '(?:class|className)'}\\s*=\\s*(["'\`])(.*?)\\1`, 'g'
    );
}

async function main() {
    if (!fs.existsSync(config_file_path)) {
        fs.writeFileSync(config_file_path, defalut_config);
    }

    const store_copy = deepClone(BLICK._STORE_);

    BLICK._STORE_ = store_copy;
    BLICK._COLOR_ = COLOR;
    BLICK._CLI_ = true;

    const blick_copy = deepClone(BLICK);

    let cli_config = {};
    let usr_config = {};

    const filesText = {};

    const foo = () => {
        delete req.cache[config_file_path];
        // config = {...config, ...requireSync(config_file_path)}
        // BLICK.config(req(config_file_path));
        BLICK.config({ ...blick_copy, ...req(config_file_path) });
        processHTMLFiles();
    };
    foo();

    chokidar.watch(config_file_path).on('change', foo);

    // if (BLICK.server) {
    //     liveServer.start({
    //         port: BLICK.server?.port ?? 3500,
    //         host: BLICK.server?.host ?? '0.0.0.0',
    //         root:
    //             BLICK.server?.root ??
    //             (fs.existsSync(`${root}/src`) ? `${root}/src` : root),
    //         open: BLICK.server?.open ?? true,
    //         logLevel: BLICK.server?.logLevel ?? 0,
    //         wait: BLICK.server?.wait ?? 0,
    //     });
    // }

    

    async function processHTMLFiles(updatedFile) {
        BLICK._STORE_ = deepClone(store_copy);

        const files = fg.sync(BLICK.input);

        for (const file of files) {
            const html = fs.readFileSync(file, 'utf-8');

            if (!file) return console.error('file error');

            const attrsValue = {};

            const regexParser = {
                class: createAttrRegexp(),
            };

            Object.keys(BLICK.attr).forEach((e) => {
                regexParser[e] = createAttrRegexp(e);
            });

            for (const attr in regexParser) {
                const matches = html.matchAll(regexParser[attr]);
                // console.log(([...matches])[2]);
                attrsValue[attr] = '';
                for (const match of matches) {
                    attrsValue[attr] += ' ' + match[2];
                }
            }
            filesText[file] = attrsValue;
            filesText[file].getAttribute = getAttribute;
        }

        const NODES = Object.values(filesText);

        let css = RENDER(null, { NODES });

        // console.log(BLICK._STORE_);
        // console.log(_STORE_);
        // console.log([css]);

        if (BLICK.beautify) {
            // css = beautify.css(css, BLICK.beautifyOptions || {});
            css = cssbeautify(css);
        }

        const outputDir = dirname(BLICK.output);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFile(BLICK.output, css, (err) => {
            if (err) {
                console.error(`Error writing file`, err);
            } else {
                
                let upd_file_msg = '';

                if (updatedFile) {
                    let upd_text = updatedFile.replaceAll('\\', '/');
                    upd_file_msg = `'${upd_text}' was changed.\n`;
                }

                let out_file_msg = BLICK.output.replaceAll(/\.+\//g, '');
                let watch_msg = BLICK.watch ? '\nWaiting for change...' : '';
                console.log(
                    `\n${upd_file_msg}'${out_file_msg}' updated successfully. ${watch_msg}`
                );
            }
        });
    }

    if (BLICK.watch) {
        chokidar.watch(BLICK.input).on('change', (filePath) => {
            processHTMLFiles(filePath);
        });
    }
}

main();
