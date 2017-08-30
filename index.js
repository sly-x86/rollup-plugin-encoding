const colors = require('colors');
const enc = require('encoding');
const fs = require('fs-extra');
const path = require('path');

function logSuccess(message) {
    console.log(message.green);
}

function logError(message) {
    console.log(message.red);
    throw new Error(message);
}

function ensureDirectoryExists(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExists(dirname);
    fs.mkdirSync(dirname);
}

function encode(options) {
    const fromCharset = options.fromCharset || 'UTF-8';
    const toCharset = options.toCharset;
    const src = options.src;
    const dest = options.dest;
    const verbose = !!options.verbose;

    fs.readFile(src, (err, data) => {
        err && logError(`Can't read 'src' file: ${src}`);

        const result = enc.convert(data, toCharset, fromCharset);
        ensureDirectoryExists(dest);
        fs.writeFile(dest, result, (err) => {
            err && logError(`Can't write 'dest' file ${dest}`);

            verbose && logSuccess(`${src} -> ${dest} was seccessfully encoded with ${toCharset}`);
        });
    });
}

module.exports = (options) => {
    const name = 'rollup-plugin-encoding';

    if (!Array.isArray(options)) {
        options = [options];
    }

    return {
        name: name,
        onwrite: (object) => {
            options.map(encode);
        }
    };
}
