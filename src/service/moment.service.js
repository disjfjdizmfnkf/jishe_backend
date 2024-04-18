const connection = require('../app/database')


class MomentService {
    async creat(content, userID) {
        const statement = 'INSERT INTO `moment` (content, user_id) VALUES (?, ?);';
        const [result] = await connection.execute(statement, [content, userID])
        return result
    }

    async queryList(offset = 0, size = 10) {
        const statement =
            `
                SELECT m.user_id                                                                               id,
                       m.content                                                                               content,
                       u.name                                                                                  name,
                       m.updateAt                                                                              updateTime,
                       m.createAt                                                                              createTime,
                       JSON_OBJECT('id', u.id, 'name', u.name, 'createAt', u.createAt, 'updateAt', m.updateAt) user
                FROM \`moment\` m
                         LEFT JOIN user u
                                   ON m.user_id = u.id
                LIMIT ? OFFSET ?;
            `

        const [result] = await connection.execute(statement, [String(size), String(offset)])
        return result
    }


    async queryByID(id) {
        const statement =
            `
                SELECT m.user_id                                                                               id,
                       m.content                                                                               content,
                       u.name                                                                                  name,
                       m.updateAt                                                                              updateTime,
                       m.createAt                                                                              createTime,
                       JSON_OBJECT('id', u.id, 'name', u.name, 'createAt', u.createAt, 'updateAt', m.updateAt) user
                FROM \`moment\` m
                         LEFT JOIN user u
                                   ON m.user_id = u.id
                WHERE m.id = ?;
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