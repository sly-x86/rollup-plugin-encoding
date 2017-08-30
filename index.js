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

module.exports = function encoding(options) {
    const name = 'rollup-plugin-encoding';
    let fromCharset,
        toCharset,
        src,
        dest,
        verbose;

    if (!Array.isArray(options)) {
        options = [options];
    }

    return {
        name: name,
        onwrite: (object) => {

            for (i in options) {
                fromCharset = options[i].fromCharset || 'UTF-8';
                toCharset = options[i].toCharset;
                src = options[i].src;
                dest = options[i].dest;
                verbose = !!options[i].verbose;

                fs.readFile(src, (err, data) => {
                    err && logError("Can't read 'src' file: " + src);

                    const result = enc.convert(data, toCharset, fromCharset);
                    ensureDirectoryExists(dest);
                    fs.writeFile(dest, result, (err) => {
                        err && logError("Can't write 'dest' file" + dest);

                        verbose && logSuccess(src + ' -> ' + dest + ' was seccessfully encoded with ' + toCharset);
                    });
                });
            }

        }
    };
}
