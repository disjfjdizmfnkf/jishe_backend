const MomentService = require('../service/moment.service')
const fs = require("fs");
const {UPLOAD_PATH} = require("../config/path");
const FileService = require("../service/file.service");

class MomentController {

    async creat(ctx, next) {
        // 获取提交信息
        const {content} = ctx.request.body
        const {id} = ctx.user

        // 提交到数据库
        const result = await MomentService.creat(content, id)

        ctx.body = {
            code: 0,
            message: '发表动态成功！',
            data: result
        }
    }

    async list(ctx, next) {
        const {offset, size} = ctx.request.body
        const result = await MomentService.queryList(offset, size)
        ctx.body = {
            code: 0,
            data: result,
        }
    }

    async detail(ctx, next) {
        // 从params拿到id
        const { momentId } = ctx.params
        const result = await MomentService.queryByID(momentId)
        ctx.body = {
            code: 0,
            data: result[0],
        }
    }

    async update(ctx, next) {
        // 1.获取要修改的动态id 修改内容id
        const { momentId } = ctx.params
        const { content } = ctx.request.body
        // 2.执行数据库语句
        const result = await MomentService.update(content, momentId)
        ctx.body = {
            code: 0,
            message: '修改动态成功',
            data: result
        }
    }

    async remove(ctx, next) {
        // 1.获取要修改的动态id
        const { momentId } = ctx.params
        // 2.执行数据库语句
        const result = await MomentService.remove(momentId)
        ctx.body = {
            code: 0,
            message: '删除动态成功',
            data: result
        }
    }

    // 给动态添加标签
    /*
    * 1. 获取标签数据，需要得到标签对象列表{name:... id:...}
    * 2. 检查关系数据库中关系是否存在
    * 3. 不存在：插入关系
    * */
    async addLabels(ctx, next) {
        try {
            // 1.获取labels数据
            const { labels }= ctx
            const { momentId } = ctx.params

            //2.检查label是否添加过
            for (const label of labels) {
                const isExists = await MomentService.hasLabel(momentId, label.id)
                if (!isExists) {
                    // 2.1插入
                    const result = await MomentService.addLabel(momentId, label.id)
                }
            }

            ctx.body = {
                code: 0,
                message: '动态添加标成功~'
            }
        } catch (error) {
            ctx.body = error
        }
    }

    // 点赞
    async like(ctx, next) {
        const {momentId} = ctx.params
        const result = await MomentService.like(momentId)
        ctx.body = {
            code: 0,
            message: '点赞成功',
            data: result
        }
    }

    // 取消点赞
    async unLike(ctx, next) {
        const {momentId} = ctx.params
        const result = await MomentService.unLike(momentId)
        ctx.body = {
            code: 0,
            message: '取消点赞成功',
            data: result
        }
    }

    async showPhotos(ctx, next) {
        const {momentId} = ctx.params

        const photoInfo = await MomentService.showPhotos(momentId)

        const { filename, mimetype } = photoInfo
        ctx.type = mimetype
        ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)

    }
}

module.exports = new MomentController()