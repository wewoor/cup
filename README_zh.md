# Cup
一个简单的，轻便的服务器容器。

# 特点
1. 轻松指定目录、端口开启服务容器
2. 全局安装，简单的CLI
3. 支持自定义服务器端口
4. 支持远程服务器代理（Proxy)

# 基本使用

#### 安装

```bash
$ npm install -g mini-cup
```
#### 示例
```
| - test
    | - css
    | - styles
    | - index.html
```
例如当你有个项目简单到只有以上一些文件和文件夹时，需要添加server容器来调试开发，你只需要在控制台切换到`test`项目所在目录，运行：

```bash
$ cup run test
```
`cup`默认开启的服务器端口是`3000`，如果端口占用，或者需要指定其他端口的情况下，则可以通过如下命令：

```bash
$ cup run test -p 8080
```
通过选项参数`-p`指定端口为`8080`

#### 其他

```bash
$ cup // 默认为命令行当前目录添加server服务
```

# 使用自定义配置文件
当我们的项目中需要跨域调用远程接口时，我们可以给项目添加一个名叫`config.cup.json`的简单`JSON`配置文件，指定服务器地址和代理地址，然后运行命令行即可，如下：
#### 项目目录
```
| - test
    | - css
    | - styles
    | - index.html
    | - config.cup.json
```
#### config.cup.json配置
```json
{
    "name": "test",
    "listen": 8080,
    "root": "./",
    "location": {
        "/test/*": "build/index.html",
        "/login": "build/index.html"
    },
    "proxyTable": {
        "/api": {
            "target": "http://test.api.fdid.fangde.com",
            "changeOrigin": true
        }
    }
}
```
#### 参数说明
- name - 项目名称
- listen - 监听端口
- root - 根目录
- location - 指定请求路径返回到指定页面 
- proxyTable - 代理设置

##### location
如果你现在正在开发一个单页应用，例如使用了React.js和React-Router的browserHistory技术，发现全局刷新页面，路由无法正确解析到指定页面时，便可以通过设置`location`参数，指定请求路由到指定页面即可

##### proxyTable
```
"/api": { // 代理所有api为根路径的请求地址
    "target": "http://test.api.com", // 代理目标服务器地址
    "changeOrigin": true // 是否改变origin
}
```
#### 运行
通过添加配置的项目，运行server只需要如下命令：

```bash
$ cup config
或者
$ cup -c
```

# License

MIT
