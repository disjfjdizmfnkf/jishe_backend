const connection = require('../app/database')

class FileService {
    // 头像的文件操作实现
    async createAvatar(filename, mimetype, size, userId) {
        const statement = 'INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);';
        const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
        return result
    }

    async queryAvatarWithUserId(userId) {
        const statement = 'SELECT * FROM avatar WHERE user_id = ?;';
        const [result] = await connection.execute(statement, [userId])
        return result.pop()
    }

    async updateUserAvatar(avatarUrl, userId) {
        const statement = 'UPDATE user SET avatar_url = ? WHERE id = ?;';
        const [result] = await connection.execute(statement, [avatarUrl, userId])
        return result.pop()
    }

    // 将动态图片提交到数据库
    async creatMomentPhoto(filename, mimetype, size, moment_id, photo_url) {
        const statement = 'INSERT INTO `moment_photos` (filename, mimetype, size, moment_id, photo_url) VALUES (?, ?, ?, ?, ?);';
        const [result] = await connection.execute(statement, [filename, mimetype, size, moment_id, photo_url])
        return result
    }


}

module.exports = new FileService()