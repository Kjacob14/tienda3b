const mysql = require('mysql2');

// Usa variables de entorno si existen (así lo configuras en GNS3 igual que
// hiciste con MYSQL_ROOT_PASSWORD), y si no, cae en los valores que ya tenías.
const pool = mysql.createPool({
    host: process.env.DB_HOST || '192.168.20.4',
    user: process.env.DB_USER || 'tienda3b_user',
    password: process.env.DB_PASSWORD || 'Tienda3B_2026',
    database: process.env.DB_NAME || 'tienda3b',
    charset: 'utf8mb4',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
