const base = "test/public"
module.exports = {
	"name": "testcup",
	"listen": 3001,
	"root": "test/public",
    "location": {
        "/api/task/get": `${base}/get.json`,
        "/api/task/add": `${base}/add.json`
    },
    "proxyTable": {
        "/join": {
            "target": "https://github.com",
            "changeOrigin": true
        }
    }
}
