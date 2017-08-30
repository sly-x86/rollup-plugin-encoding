# rollup-plugin-encoding

Rollup plugin to convert files from one encoding to another, built on top of [encoding](https://www.npmjs.com/package/encoding) package.

## Installation

```
npm install --save-dev rollup-plugin-encoding
```

## Usage

Add the following lines to your `rollup.config.js`:

```javascript
import encoding from 'rollup-plugin-encoding';

export default {
    // ...
    plugins: [
        encoding({
            src: 'src/fileToEncode.js',
            dest: 'dist/encodedFile.cp1251.js',
            toCharset: 'CP1251',
            verbose: true
        })
    ]
}
```

or

```javascript
import encoding from 'rollup-plugin-encoding';

export default {
    // ...
    plugins: [
        encoding([
            {src: 'src/fileToEncode1.js', dest: 'dist/encodedFile1.js', toCharset: 'CP1251'},
            {src: 'src/fileToEncode2.js', dest: 'dist/encodedFile2.js', toCharset: 'CP1251'},
            // ...
        ])
    ]
}
```
### Options

* **`src:<string>`**<font color="red">*</font> - path to the file to be encoded
* **`dest:<string>`**<font color="red">*</font> - path where to put encoded file
* **`toCharset:<string>`**<font color="red">*</font> - the charset to convert to
* **`fromCharset:<string>`** - *(optional, default `'UTF-8'`)* the source charset
* **`verbose:<boolean>`** - *(optional, default `false`)* display verbose message
