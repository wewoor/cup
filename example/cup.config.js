const base = './dist'
module.exports = {
    name: 'testcup',
    listen: 3001,
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
