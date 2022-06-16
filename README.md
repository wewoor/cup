# Cup

[![NPM downloads][download-img]][download-url] [![NPM version][npm-version]][npm-version-url]

**Easy to serve web resources, and proxy requests**. You can make use of the `Cup` to mock `Nginx` for your web application sometimes.

[download-img]: https://img.shields.io/npm/dm/mini-cup.svg?style=flat
[download-url]: https://www.npmjs.com/package/mini-cup
[npm-version]: https://img.shields.io/npm/v/mini-cup.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/@dtinsight/molecule

[中文文档](./README_zh.md)  | [English](./README.md)

## Installation

```bash
$ npm install -g mini-cup

Or

$ yarn add -g mini-cup
```

## Usage

### Run the server by the specified path

```bash
$ cup run <path> //The path is your indicated directory
```

### Run the server by the specified path and port

```bash
$ cup run <path> -p <port>
```

### Run by `cup.config.js` config mode

Run the server by the custom configuration. There you can to initialize a `cup.config.js` file in the current working directory.

```bash
$ cup init
```

And run the start command:

```bash
$ cup run -c
```

#### The example of `cup.config.js`

```js
const base = './dist'
module.exports = {
    name: 'example',
    listen: 3000,
    root: base,
    location: {
        '/api/task/get': `${base}/get.json`,
        '/api/task/add': `${base}/add.json`
    },
    proxyTable: {
        '/join': {
            target: 'https://github.com',
            changeOrigin: true
        }
    }
}
```

## Proxy

More usage of Proxy, please refer to [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware).

## License

MIT
