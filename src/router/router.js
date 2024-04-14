const KoaRouter = require('@koa/router');
const {askToChatGpt} = require("../controller/chatGpt.controller");
const UserController = require("../controller/user.controller")
const UserService = require("../service/user.service");

// 1.创建路由对象
const useRouter = new KoaRouter()

// 2.定义路由中的映射
// 2.1 AI聊太接口
useRouter.post('/chatbot', askToChatGpt);
// 2.2 用户注册接口
useRouter.post('/users',async (ctx, next)=>{
    const user = ctx.request.body

    // 检查 输入、用户是否存在
    const {name, password} = user

    if (!name || !password) {
        ctx.body = {
            code: -1001,
            message: '用户名或密码不能为空',
        }
        return
    }

    const findName = await UserService.findUser(name)

    if (findName) {
        ctx.body = {
            code: -1002,
            message: '该用户已存在 ',
        }
        return
    }

    await next()
} ,UserController.creat)



// 3.导出路由
module.exports = useRouter