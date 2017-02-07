var exec = require('child_process').exec;

var dir = process.env.PWD;
console.log(dir)

describe("Cup", function() {

    describe("run indicate path", function() {
        it("cup run a indicate path without error", function() {
            exec(`node ${dir}/app.js run ${dir}/test/public`)
        })
    })

})