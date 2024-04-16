const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const userRouter = require('../router/user.router')
const chatRouter = require('../router/chat.router')
const loginRouter = require('../router/login.router')

// 创建app
const app = new Koa();
// 全局中间件
app.use(cors());
app.use(bodyParser());
// 使路由中间件生效、其它请求方式返回其错误信息
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(chatRouter.routes());
app.use(chatRouter.allowedMethods());
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());

module.exports = app