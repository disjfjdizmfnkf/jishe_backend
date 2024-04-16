const KoaRouter = require('@koa/router');
const {askToChatGpt} = require("../controller/chatGpt.controller");
const UserController = require("../controller/user.controller")
const {verifyUser, handlePassword} = require("../middleware/user.middleware");

// 1.创建路由对象
const useRouter = new KoaRouter()

// 2.定义路由中的映射
// 2.1 AI聊太接口
useRouter.post('/chatbot', askToChatGpt);
// 2.2 用户注册接口
useRouter.post('/users', verifyUser, handlePassword, UserController.creat)


// 3.导出路由
module.exports = useRouter