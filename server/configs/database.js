const {Client} = require('pg')
require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    port: process.env.DB__PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
})


module.exports = client