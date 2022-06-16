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
