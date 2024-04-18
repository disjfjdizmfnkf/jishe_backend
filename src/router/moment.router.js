const KoaRouter = require('@koa/router')
const {verifyAuth} = require("../middleware/login.middleware");
const { creat } = require("../controller/moment.controller")

const momentRouter = new KoaRouter({prefix: '/moment'})

momentRouter.post('/', verifyAuth, creat)


module.exports = momentRouter