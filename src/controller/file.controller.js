const FileService = require('../service/file.service')
const {SERVER_HOST, SERVER_PORT} = require('../config/server')


class FileController {
    async create(ctx, next) {
        // 1.获取头像对应的信息
        const { filename, mimetype, size } = ctx.request.file
        const { id } = ctx.user

        // 2.将这些信息一起存入数据库
        const result = await FileService.create(filename, mimetype, size, id)

        // 3.将头像地址存入用户表中
        const avatarUrl = `http://${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
        const insertAvatar = await FileService.updateUserAvatar(avatarUrl, id)

        // 3.返回查询结果
        ctx.body = {
            code: 0,
            message: '头像上传成功',
            data: result, insertAvatar
        }
    }
}

module.exports = new FileController()