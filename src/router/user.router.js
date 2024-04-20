const KoaRouter = require('@koa/router');
const { creat } = require("../controller/user.controller")
const {verifyUser, handlePassword} = require("../middleware/user.middleware");
const { showAvatarImage } = require('../controller/user.controller')


// 1.创建路由对象
const userRouter = new KoaRouter({prefix: '/users'})

// 2.定义路由中的映射
// 用户注册接口
userRouter.post('/', verifyUser, handlePassword, creat)
// 查看用户头像
userRouter.get('/avatar/:userId', showAvatarImage)


// 3.导出路由
module.exports = userRouter