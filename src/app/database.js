const mysql2 = require('mysql2')

// 1.创建连接池
const connectionPool = mysql2.createPool({
    host: 'localhost',
    port: 3306,
    database: 'cdpc',
    user: 'root',
    password: '284622',
    connectionLimit: 5
})

// 检查连接是否成功
connectionPool.getConnection((err, connection) => {
    if (err) {
        console.log('获取连接失败', err)
        return
    }

    connection.connect((err) => {
        if (err) {
            console.log('数据库交互失败', err)
        } else {
            console.log('数据库连接成功')
        }
    })

})

// 调用连接池的promise方法，之后调用连接池方法时都返回promise
const connection = connectionPool.promise()

module.exports = connection