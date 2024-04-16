const UserService = require("../service/user.service");
const {NAME_OR_PASSWORD_IS_REQUIRED, USER_IS_ALREADY_EXISTS} = require("../config/error");
const md5password = require("../utils/sha256password");

const verifyUser = async (ctx, next) => {

    // 检查 输入、用户是否存在
    const {name, password} = ctx.request.body

    if (!name || !password) {
        return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    }

    const findName = await UserService.findUser(name)

    if (findName.length) {
        return ctx.app.emit('error', USER_IS_ALREADY_EXISTS, ctx)
    }

    await next()
}


const handlePassword = async (ctx, next) => {
    // 1.拿到用户输入的密码
    const { password } = ctx.request.body

    // 2.使用sha256加密
    ctx.request.body.password = md5password(password)

    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}