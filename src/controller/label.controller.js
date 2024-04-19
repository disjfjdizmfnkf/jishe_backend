const LabelService = require('../service/label.service')


class LabelController {
    async create(ctx, next) {
        // 1.获取标签名称
        const { name } = ctx.request.body

        // 2. 存储到数据库
        const result = await LabelService.create(name)

        ctx.body = {
            code: 0,
            message: '创建标签成功！',
            data: result
        }
    }
}

module.exports = new LabelController()