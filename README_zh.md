# Cup

[![NPM downloads][download-img]][download-url] [![NPM version][npm-version]][npm-version-url]

轻松启动 Web 静态资源服务，以及支持请求代理。有些时候，我们可以使用 `Cup` 为我们的
Web 应用模拟一些 `Nginx` 的功能。

[download-img]: https://img.shields.io/npm/dm/mini-cup.svg?style=flat
[download-url]: https://www.npmjs.com/package/mini-cup
[npm-version]: https://img.shields.io/npm/v/mini-cup.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/@dtinsight/molecule

[中文文档](./README_zh.md)  | [English](./README.md)

## 安装

```bash
$ npm install -g mini-cup

Or

$ yarn add -g mini-cup
```

## 使用

### 使用指定**路径**运行 Web 服务

```bash
$ cup run <path>
```

### 使用制定的的**路径、端口**启动运行 Web 服务

```bash
$ cup run <path> -p <port>
```

### 使用 `cup.config.js` 配置模式

使用自定义的配置文件运行 Web 服务。你可以在工作目录先初始化一个`cup.config.js`文件：

```bash
$ cup init
```

使用配置模式启动

```bash
$ cup run -c
```

#### `cup.config.js` 示例

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

## 代理

更多代理配置的使用，可以参考 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 的文档.

## License

MIT
