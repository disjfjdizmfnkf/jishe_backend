const connection = require('../app/database')


class CommentService
{
    async create(content, momentId, userId)
    {
        const insertStatement = 'INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);';
        const [insertResult] = await connection.execute(insertStatement, [content,  momentId, userId]);

        const selectStatement = `
            SELECT 
                c.id, c.content, c.moment_id, c.user_id, c.comment_id,
                JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) as user
            FROM 
                comment c
            LEFT JOIN 
                user u ON c.user_id = u.id
            WHERE 
                c.id = ?;
        `;
        const [selectResult] = await connection.execute(selectStatement, [insertResult.insertId]);
        return selectResult[0];
    }

    async replay(content, commentId, momentId, userId) {
        const insertStatement = 'INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?);';
        const [insertResult] = await connection.execute(insertStatement, [content,  momentId, commentId, userId]);

        const selectStatement = `
            SELECT 
                c.id, c.content, c.moment_id, c.user_id, c.comment_id,
                JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) as user
            FROM 
                comment c
            LEFT JOIN 
                user u ON c.user_id = u.id
            WHERE 
                c.id = ?;
        `;
        const [selectResult] = await connection.execute(selectStatement, [insertResult.insertId]);
        return selectResult[0];
    }
}

module.exports = new CommentService()