// 导入app
const app = require('./app/index')
const {SERVER_PORT} = require("./config/server");

// 启动服务器
app.listen(SERVER_PORT, () => {
    console.log(`服务运行成功🚀🚀🚀 端口:${SERVER_PORT}`);
});