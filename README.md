# Cup
An easy way to run a file server in your system. you can indicate the public file path to run the server ,and look these html static files in browser.


# install

> npm install https://github.com/wewoor/cup.git -g

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
you can write a configration file which name is `config.cup.json`,
and this file is located in you project root path. when you 
run the below command, this file will be readed by cup, and the server by your configration.

```bash
$ cup run -c
```

# License

MIT
