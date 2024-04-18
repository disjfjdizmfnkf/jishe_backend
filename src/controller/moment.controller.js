const MomentService = require('../service/moment.service')

class MomentController{
    // 在数据库中创建信息
    MomentService;
    async creat(ctx, next){
        // 获取提交信息
        const { content } = ctx.request.body
        const { id } = ctx.user

        // 提交到数据库
        const result = await MomentService.creat(content, id)

        ctx.body = {
            code: 0,
            message: '发表动态成功！',
            data: result
        }
    }
}

module.exports = new MomentController()