const UserService = require('../service/user.service')
const FileService = require("../service/file.service");
const fs = require("fs");
const {UPLOAD_PATH} = require("../config/path");

class UserController {
    // 创建用户到数据库
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

    // 展示用户头像
    async showAvatarImage(ctx, next) {
        // 1.获取用户id
        const { userId } = ctx.params

        // 2.从数据库中查询
        const avatarInfo = await FileService.queryAvatarWithUserId(userId)

        // 3.读取头像所在的文件
        const { filename, mimetype } = avatarInfo
        ctx.type = mimetype
        ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
    }
}

module.exports = new UserController()
