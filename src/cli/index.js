#!/usr/bin/env node

console.log('\n================BlickCss================\n');

import fs       from 'fs';
import fg       from 'fast-glob';
import url      from 'url';
import path     from 'path';
import chokidar from 'chokidar';

import BLICK  from '../theme/index.js';
import RENDER from '../funcs/render.js';
import COLOR  from './funcs/make-hex.js';
import CONFIG from './default-config.js';

import { isModule      } from './funcs/is-module.js';
import { deepClone     } from './funcs/deep-clone.js';
import { cssbeautify   } from './funcs/cssbeautify.js';

import { processFile } from './funcs/process-file.js';
import { showMsg } from './funcs/show-msg.js';
import { mkdirIfNotExist, writeFileIfNotExist } from './funcs/node-helpers.js';

try {
    const DIR = path.dirname(url.fileURLToPath(import.meta.url));
    const CWD = process.cwd();

    const CONFIG_FILE_NAME = `blick.config.${!isModule() ? 'm' : ''}js`
    const CONFIG_FILE_PATH = path.resolve(CONFIG_FILE_NAME)
    const CONFIG_FILE_PATH_REL = path.relative(DIR, CONFIG_FILE_PATH);

    const STORE_COPY = deepClone(BLICK._STORE_);
    const BLICK_COPY = deepClone(BLICK);

    BLICK._COLOR_ = COLOR;
    BLICK._CLI_ = true;

    async function filesUpdate(updatedFile) {
        BLICK._STORE_ = deepClone(STORE_COPY)

        const FILES = fg.sync(BLICK.input);
        const ATTRS = ["class", ...getTruthyKeys(BLICK.attr)];
        const NODES = [];

        for (const file of FILES) {        
            NODES.push(processFile(file, ATTRS));
        }

        let CSS = RENDER(null, { NODES });

        if (BLICK.beautify) {
            CSS = cssbeautify(CSS);
        }

        mkdirIfNotExist(path.dirname(BLICK.output))

        fs.writeFile(BLICK.output, CSS, (err) => {
            if (err) {
                return console.error(`BlickCss: Error writing file`, err);
            }
            showMsg(updatedFile, BLICK)
        });
    }

    async function handleConfigUpdate() {
        const PATH = `./${CONFIG_FILE_PATH_REL}?update=${Date.now()}`
        const CONFIG = await import(PATH)

        BLICK.config({ ...BLICK_COPY, ...CONFIG.default });

        filesUpdate();
    };


    async function main() {
        writeFileIfNotExist(CONFIG_FILE_PATH, CONFIG);
        
        await handleConfigUpdate();
    
        chokidar.watch(CONFIG_FILE_PATH).on('change', handleConfigUpdate);
    
        if (BLICK.watch) {
            chokidar.watch(BLICK.input).on('change', (filePath) => {
                filesUpdate(filePath);
            });
        }
    }
    
    main();
}
catch (error) {
    console.log(error);
}