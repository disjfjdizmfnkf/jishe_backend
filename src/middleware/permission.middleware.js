const PermissionService = require('../service/permission.service')
const {PERMISSION_DENIED} = require("../config/error");

const verifyPermission = async (ctx, next) => {

    try {
        // 1.获取用户id
        const { id } = ctx.user

        // 2.获取资源id
        // name => moment/user/comment/label
        // params: { momentID: 4 }
        // keyName => momentId
        const keyName = Object.keys(ctx.params)[0]
        const resourceId = ctx.params[keyName]
        const resourceName = keyName.replace('Id', '')

        // 3.查询权限
        const isPermission = await PermissionService.checkResource(resourceName, resourceId, id)
        if (!isPermission) {
            return ctx.app.emit('error', PERMISSION_DENIED, ctx)
        }
        // 3.判断结束后才执行下一个中间件修改动态
        await next()
    } catch (error) {
        ctx.body = error
    }

}


module.exports = {
    verifyPermission,
}