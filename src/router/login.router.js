const KoaRouter = require('@koa/router')
const LoginController = require("../controller/login.controller")
const {verifyLogin, verifyAuth} = require("../middleware/login.middleware");

const loginRouter = new KoaRouter({prefix: '/login'})

loginRouter.post('/', verifyLogin, LoginController.sign)
loginRouter.get('/test', verifyAuth, LoginController.test)

module.exports = loginRouter