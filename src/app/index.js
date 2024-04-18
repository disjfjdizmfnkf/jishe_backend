const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const registerRouters = require('../router/index')

// 创建app
const app = new Koa();
// 全局中间件
app.use(cors());
app.use(bodyParser());
// 自动注册路由
registerRouters(app)

module.exports = app