require('dotenv').config();
const mysql = require('mysql')

// Citation for the db connector:
// Date : 02/23/2025
// Based on:
// Source URL: https://canvas.oregonstate.edu/courses/1987790/assignments/9888486?module_item_id=25022943

// Provide credentials for connecting to database
const pool = mysql.createPool({
    connectionLimit : process.env.DB_CONNECTION_LIMIT,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME,
    multipleStatements: true
})

module.exports.pool = pool;