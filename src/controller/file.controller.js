const FileService = require('../service/file.service')
const {SERVER_HOST, SERVER_PORT} = require('../config/server')

class FileController {
    async createAvatar(ctx, next) {
        // 1.获取对应的信息
        const {filename, mimetype, size} = ctx.request.file
        const {id} = ctx.user

        // 2.进行数据库操作
        const result = await FileService.createAvatar(filename, mimetype, size, id)

        // 3.将头像的地址信息, 保存到user表中
        const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
        const result2 = await FileService.updateUserAvatar(avatarUrl, id)

        // 3.返回结果
        ctx.body = {
            code: 0,
            message: '头像上传成功',
            data: avatarUrl
        }
    }

    async creatMomentPhotos(ctx, next) {
        // 1.获取对应的信息
        const {filename, mimetype, size} = ctx.request.file;
        const {momentId} = ctx.params;

        // 2.将图片信息和id结合起来进行存储
        const MomentPhotoUrl = `${SERVER_HOST}:${SERVER_PORT}/moment/photos/${momentId}`

        await FileService.creatMomentPhoto(filename, mimetype, size, momentId, MomentPhotoUrl);

        // 3.返回结果
        ctx.body = {
            code: 0,
            message: '动态图片上传成功',
            data: MomentPhotoUrl
        }
    }
}

module.exports = new FileController()