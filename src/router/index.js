const fs = require('fs')


function registerRouters(app){
    const files = fs.readdirSync(__dirname)

    for(const file of files) {
        // 获取所有路由文件
        if (!file.endsWith(`.router.js`)) continue

        // 导入
        const router = require(`./${file}`)
        // 使用中间件
        app.use(router.routes());
        app.use(router.allowedMethods());
    }
}

module.exports = registerRouters