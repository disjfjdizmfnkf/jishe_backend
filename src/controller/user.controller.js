const UserService = require('../service/user.service')

class UserController {
    async creat(ctx, next) {
        // 获取用户信息
        const user = ctx.request.body

        // 将数据存入数据库
        const result = await UserService.create(user)


        ctx.body = {
            message: '创建用户成功!',
            data: result
        }
    }
}

module.exports = new UserController()
