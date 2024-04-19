const KoaRouter = require('@koa/router')
const {verifyAuth} = require("../middleware/login.middleware");
const { creat, list, detail, update, remove, addLabels } = require("../controller/moment.controller")
const {verifyPermission} = require("../middleware/permission.middleware");
const {verifyLabelExists} = require("../middleware/label.middleware");

const momentRouter = new KoaRouter({prefix: '/moment'})

// 动态功能接口
// 1.增
momentRouter.post('/', verifyAuth, creat)

// 2.查
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)

// 3.删
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

// 4.改
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)


// 添加标签
momentRouter.post('/label/:momentId', verifyAuth, verifyPermission, verifyLabelExists, addLabels)

module.exports = momentRouter