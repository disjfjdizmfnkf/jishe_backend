const fs = require('fs')
const path = require('path')

// 默认情况下相对路径和项目的启动路径相关
// const PUBLIC_KEY = fs.readFileSync('./src/config/keys/public.key')
// const PRIVATE_KEY = fs.readFileSync('./src/config/keys/private.key')

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

module.exports = {
    PRIVATE_KEY,
    PUBLIC_KEY
}
