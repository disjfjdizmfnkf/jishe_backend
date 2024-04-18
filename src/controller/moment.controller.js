const MomentService = require('../service/moment.service')

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
}

module.exports = new MomentController()