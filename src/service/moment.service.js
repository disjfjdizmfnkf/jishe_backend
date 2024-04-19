const connection = require('../app/database')


class MomentService {
    async creat(content, userID) {
        const statement = 'INSERT INTO `moment` (content, user_id) VALUES (?, ?);';
        const [result] = await connection.execute(statement, [content, userID])
        return result
    }

    // 查询动态返回评论个数
    async queryList(offset = 0, size = 10) {
        const statement =
            `
                SELECT m.id                                                                                    id,
                       m.content                                                                               content,
                       u.name                                                                                  name,
                       m.updateAt                                                                              updateTime,
                       m.createAt                                                                              createTime,
                       JSON_OBJECT('id', u.id, 'name', u.name, 'createAt', u.createAt, 'updateAt', m.updateAt) user,
                       (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id)                           commentCount
                FROM \`moment\` m
                         LEFT JOIN user u ON m.user_id = u.id
                LIMIT ? OFFSET ?;
            `

        const [result] = await connection.execute(statement, [String(size), String(offset)])
        return result
    }

    // 查询动态返回评论列表
    async queryByID(id) {
        const statement =
            `
                SELECT m.id id, m.content content, m.createAt creatTime, m.updateAt updateTime,
                       JSON_OBJECT('id', u.id, 'name', u.name, 'creatTime', u.createAt ) user,
                       (
                           JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id,
                                                     'user', JSON_OBJECT('id', cu.id, 'name', cu.name))
                           )
                           )
                FROM moment m
                         LEFT JOIN user u ON u.id = m.user_id
                         LEFT JOIN comment c on m.id = c.moment_id
                         LEFT JOIN user cu on c.user_id = cu.id
                WHERE m.id = ?
                GROUP BY m.id;
            `

        const [result] = await connection.execute(statement, [id])
        return result
    }

    async update(content, momentId) {
        const statement = `UPDATE moment
                           SET content = ?
                           WHERE id = ?;`

        const [result] = await connection.execute(statement, [content, momentId])
        return result
    }

    async remove(momentId) {
        const statement = 'DELETE FROM moment WHERE id = ?;'
        const [result] = await connection.execute(statement, [momentId])
        return result
    }
}


module.exports = new MomentService()