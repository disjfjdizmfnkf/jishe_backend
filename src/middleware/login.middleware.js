const UserService = require("../service/user.service");
const md5password = require("../utils/sha256password");

const {
    NAME_OR_PASSWORD_IS_REQUIRED,
    USER_IS_NOT_EXISTS, PASSWORD_ERROR, UNAUTHORIZED,
} = require("../config/error");

const jwt = require("jsonwebtoken");
const {PUBLIC_KEY} = require("../config/secret");


const verifyLogin = async (ctx, next) => {

    const {name, password} = ctx.request.body


    // 检查输入是否为空
    if (!name || !password) {
        // emit ctx更好了解错误信息
        return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    }

    // 验证用户是否存在
    const users = await UserService.findUser(name)
    const user = users[0]
    if (!user) {
        return ctx.app.emit('error', USER_IS_NOT_EXISTS, ctx)
    }

    // 验证密码是否正确
    if (user.password !== md5password(password)) {
        return ctx.app.emit('error', PASSWORD_ERROR, ctx)
    }

    // 将查到的user对象保存
    ctx.user = user

    await next()
}

const verifyAuth = async (ctx, next) => {
    // 获取用户传入的token
    const authorization = ctx.headers.authorization
    if (!authorization) {
        return ctx.app.emit('error', UNAUTHORIZED, ctx)
    }

    const token = authorization.replace('Bearer ', '')

    try {
        // 验证token并保存payload中提交验证时的用户信息
        ctx.user = jwt.verify(token, PUBLIC_KEY, {
            algorithm: ['RS256']
        })

        await next()
    } catch (error) {
        console.log(error)
        ctx.app.emit('error', UNAUTHORIZED, ctx)
    }
}


module.exports = {
    verifyLogin,
    verifyAuth
}