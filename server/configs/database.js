const {Client} = require('pg')
require('dotenv').config();
// const client = new Client({
//     host: "postgres2.cnphssl1jbzd.ap-southeast-1.rds.amazonaws.com",
//     user: "postgres",
//     port: "5432",
//     password: "postgres",
//     database: "postgres",
//     ssl: {
//         rejectUnauthorized: false
//     }
// })
const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
})


module.exports = client