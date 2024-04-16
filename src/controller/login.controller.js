const jwt = require('jsonwebtoken')
const {PRIVATE_KEY} = require("../config/secret");

// class LoginController  {
//     sign(ctx, next){
//         // 1.获取用户信息
//         const {id, name, password} = ctx.user
//
//         // 2.颁发token
//         const token = jwt.sign({id, name}, PRIVATE_KEY, {
//             // 保存时间 (s)
//             expiresIn: 60 * 60 * 24,
//             algorithm: 'RS256'
//         })
//
//         // 3.返回用户信息
//         ctx.body = { code: 0, data: { id, name }}
//     }
// }

class LoginController {
    sign(ctx, next) {
        // 1.获取用户信息
        const {id, name, password} = ctx.user

        // 2.颁发token
        let token;
        try {
            token = jwt.sign({id, name}, PRIVATE_KEY, {
                // 保存时间 (s)
                expiresIn: 60 * 60 * 24,
                algorithm: 'RS256'
            })
        } catch (error) {
            // Log the error for debugging purposes
            console.error(error);
            // Respond with a 500 status code (Internal Server Error) and end the request
            ctx.status = 500;
            ctx.body = {error: 'Internal Server Error'};
            return;
        }

        // 3.返回用户信息
        ctx.body = {code: 0, data: {id, name, token}}
    }
}

module.exports = new LoginController()