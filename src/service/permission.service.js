const connection = require('../app/database')

class PermissionService {
    async checkResource(resourceName, resourceId, id) {
        const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`;
        const [result] = await connection.execute(statement, [resourceId, id])

        return !!result.length
    }
}

module.exports = new PermissionService()