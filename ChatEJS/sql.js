const mysql = require("mysql")
const db = mysql.createConnection({
    // host: "34.125.191.240",
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "demo",
    port: 3306
})

db.connect();

module.exports = db;