const app = require('../app/index')
const {NAME_OR_PASSWORD_IS_REQUIRED, USER_IS_ALREADY_EXISTS, USER_IS_NOT_EXISTS, PASSWORD_ERROR, UNAUTHORIZED,
    PERMISSION_DENIED
} = require('../config/error')

app.on('error', (error, ctx) => {
    let code = 0
    let message = ''
    switch (error) {
        case NAME_OR_PASSWORD_IS_REQUIRED:
            code = -1001
            message = '用户名或者密码不能为空'
            break
        case USER_IS_ALREADY_EXISTS:
            code = -1002
            message = '用户名已存在'
            break
        case USER_IS_NOT_EXISTS:
            code = -1003
            message = '用户不存在'
            break
        case PASSWORD_ERROR:
            code = -1004
            message = '密码错误'
            break
        case UNAUTHORIZED:
            code = -1005
            message = '未授权的token'
            break
        case PERMISSION_DENIED:
            code = -2001
            message = '没有权限'
    }


    ctx.body = {code, message}
})