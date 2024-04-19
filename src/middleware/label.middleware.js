const LabelService = require('../service/label.service')

/*
* 1. 检查标签在标签数据库中是否存在，添加所有不存在标签
* 2. 创建出标签对象
* */

const verifyLabelExists = async (ctx, next) => {
    // 1.获取所有label
    const {labels} = ctx.request.body

    // 2.检查label,赋予label id
    const newLabels = []
    for (const name of labels) {
        const result = await LabelService.queryLabelByName(name)
        const labelObj = { name }
        if (result) {
            labelObj.id = result.id //labelObj => { name:... id:... }
        } else {
            const insertResult = await LabelService.create(name)
            labelObj.id = insertResult.insertId
        }
        newLabels.push(labelObj)
    }

    // 3.newLabels => {{ name:... id:... }, { name:... id:... }, { name:... id:... }}
    ctx.labels = newLabels

    await next()
}

module.exports = {
    verifyLabelExists
}