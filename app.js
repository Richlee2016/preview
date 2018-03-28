const fs = require("fs")
const path = require("path")
module.exports = app => {
    app.messenger.on('update-qiniu', data => {
        console.log(data);
    });
}