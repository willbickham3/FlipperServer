const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_bickhamw',
    password        : '3236',
    database        : 'cs340_bickhamw'
})

module.exports.pool = pool;