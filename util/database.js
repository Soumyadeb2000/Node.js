const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localHost',
    user: 'root',
    database: 'node-complete',
    password: 'Monuking@12'
});

module.exports = pool.promise();