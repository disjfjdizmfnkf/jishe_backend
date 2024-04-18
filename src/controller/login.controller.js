const jwt = require('jsonwebtoken')
const {PRIVATE_KEY} = require("../config/secret");


class LoginController {
    sign(ctx, next) {
        // 1.获取用户信息
        const { id, name } = ctx.user

        // 2.颁发token
        let token;
        try {
            token = jwt.sign({id, name}, PRIVATE_KEY, {
                // 保存时间 (s)
                expiresIn: 60 * 60 * 24,
                algorithm: 'RS256'
            })
        } catch (error) {
            console.error(error);
            return;
        }

        // 3.返回用户信息
        ctx.body = {code: 0, data: {id, name, token}}
    }

    test(ctx, next) {
        ctx.body = '身份验证通过'
    }
}

module.exports = new LoginController()