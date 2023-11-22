const {Client} = require('pg')
require('dotenv').config();

const client = new Client({
    host: "postgres2.cnphssl1jbzd.ap-southeast-1.rds.amazonaws.com",
    user: "postgres",
    port: "5432",
    password: "postgres",
    database: "postgres",
    ssl: {
        rejectUnauthorized: false
    }
})


module.exports = client