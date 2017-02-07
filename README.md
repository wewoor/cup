# Cup
An easy way to run a web server in your system. you can indicate the public file path to run the server ,and look these html static files in browser.

# Features
> 1. support custom server port
> 2. support indicate server public path
> 3. support location parse. you can use location specify some special path.
> 4. support api server proxy.

# Install & Upgrade

> npm install -g cup-server

# Usage

### run default path

```bash
$ cup run //Default path is current root directory. 
```

### run indicated path

```bash
$ cup run <path> //The path is your indicated directory
```

### run indicated path and server port

```bash
$ cup run <path> -p <port>
```

### run by custom configration
you can write a configration file which name is `config.cup.json` and located in you project root path. when you run the belows commands, this config file will be readed by cup, and the server will be run by your configration.

```bash
$ cup -c
or
$ cup config
```

#### config example
```json
{
    "name": "testcup",
    "listen": 3001,
    "root": "test/public",
    "location": {
        "*": "test/public/index.html"
    },
    "proxyTable": {
        "/public": "www.google.com",
        "/test": "www.google.com"
    }
}
```

### proxy config
More proxy config [options](https://github.com/chimurai/http-proxy-middleware)

# Github

https://github.com/wewoor/cup

# License

MIT
