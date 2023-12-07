const  {Pool}  = require('pg')
require('dotenv').config() // 加載環境變數

// pg 連接資料庫格式
const pool = new Pool ({
    user: 'postgres',
    password:process.env.PASSWORD,
    host:process.env.HOST,
    port:process.env.DBPORT,
    database:'user'
}) 

module.exports = pool; // 匯出為一個 Node.js 模組