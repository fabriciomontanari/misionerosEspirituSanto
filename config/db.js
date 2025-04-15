const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'ballast.proxy.rlwy.net',     
    port: 19457,                         
    user: 'root',                       
    password: 'qBXsZfplsUQGLnXpyvOpCIjWVVLkqHiF',         
    database: 'railway',                
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
