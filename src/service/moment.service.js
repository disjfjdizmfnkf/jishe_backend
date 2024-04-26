const connection = require('../app/database')


class MomentService {
    async creat(content, userID) {
        const statement = 'INSERT INTO `moment` (content, user_id) VALUES (?, ?);';
        const [result] = await connection.execute(statement, [content, userID])
        return result
    }

    // 查询动态返回动态信息，评论信息，评论用户信息
    async queryList(offset = 0, size = 3) {
        const statement =
            `
                SELECT m.id                                                             id,
                       m.content                                                        content,
                       m.createAt                                                       createTime,
                       m.updateAt                                                       updateTime,
                       m.likes                                                          uerLikes,
                       JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url, 'createAt', u.createAt,
                                   'updateAt', m.updateAt, 'likesCount', m.likes)       user,
                       (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'comment', c.comment_id,
                                                         'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl',
                                                                             cu.avatar_url)))
                        FROM comment c
                                 LEFT JOIN
                             user cu ON cu.id = c.user_id
                        WHERE m.id = c.moment_id)                                       comments,
                       (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name))
                        FROM moment_label ml
                                 JOIN label l ON ml.label_id = l.id
                        WHERE ml.moment_id = m.id)                                      labels,
                       (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id)        commentCount,
                       (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
                FROM moment m
                         LEFT JOIN
                     user u ON m.user_id = u.id
                LIMIT ? OFFSET ?;
            `

        const [result] = await connection.execute(statement, [String(size), String(offset)])
        return result
    }

    // 查询动态返回评论列表  多对多表在查询时遇到重复查询情况: 重复用左连接的话 一动态 => 多评论 => 重复标签， 应该用子查询避免这种问题
    async queryByID(id) {
        const statement =
            `
                SELECT m.id                                                                                        id,
                       m.content                                                                                   content,
                       m.createAt                                                                                  creatTime,
                       m.updateAt                                                                                  updateTime,
                       JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url, 'creatTime', u.createAt) user,
                       JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'comment', c.comment_id, 'user',
                                                 JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl',
                                                             cu.avatar_url)))                                      comment,
                       (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name))
                        FROM moment_label ml
                                 JOIN label l ON ml.label_id = l.id
                        WHERE ml.moment_id = m.id)                                                                 labels
                FROM moment m
                         LEFT JOIN
                     user u ON m.user_id = u.id
                         LEFT JOIN
                     comment c ON m.id = c.moment_id
                         LEFT JOIN
                     user cu ON cu.id = c.user_id
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

    async hasLabel(momentId, labelId) {
        const statement = 'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;'
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result.length > 0
    }

    async addLabel(momentId, labelId) {
        const statement = 'INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);'
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result
    }

    // 点赞
    async like(momentId) {
        const updateStatement = 'UPDATE `moment` SET `likes` = `likes` + 1 WHERE `id` = ?;';
        await connection.execute(updateStatement, [momentId]);

        const selectStatement = 'SELECT `likes` FROM `moment` WHERE `id` = ?;';
        const [result] = await connection.execute(selectStatement, [momentId]);

        return result[0];
    }

    // 取消赞
    async unLike(momentId) {
        const updateStatement = 'UPDATE `moment` SET `likes` = `likes` - 1 WHERE `id` = ?;';
        await connection.execute(updateStatement, [momentId]);

        const selectStatement = 'SELECT `likes` FROM `moment` WHERE `id` = ?;';
        const [result] = await connection.execute(selectStatement, [momentId]);

        return result[0];
    }

    //  查询动态图片并且返回url
    async showPhotos(momentId) {
        const statement =
            `
                SELECT moment_photos.id        id,
                       moment_photos.filename filename,
                       moment_photos.mimetype mimetype,
                       moment_photos.size size
                FROM moment_photos
                WHERE moment_photos.moment_id = ?;
            `;
        const [result] = await connection.execute(statement, [momentId])
        return result.pop()
    }
}


module.exports = new MomentService()