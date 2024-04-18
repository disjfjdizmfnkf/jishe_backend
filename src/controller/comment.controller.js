const CommentService = require("../service/comment.service")


class CommentController {
    async create(ctx, next) {
        // 1.获取body中的参数
        const {content, momentId} = ctx.request.body
        const {id} = ctx.user

        // 2.添加到数据库
        const result = await CommentService.create(content, momentId, id)

        ctx.body = {
            code: 0,
            message: '评论成功',
            data: result
        }
    }

    async reply(ctx, next) {
        const {content, commentId, momentId} = ctx.request.body
        const {id} = ctx.user

        const result = await CommentService.replay(content, commentId, momentId, id)

        ctx.body = {
            code: 0,
            message: '回复成功',
            data: result
        }
    }
}

module.exports = new CommentController()