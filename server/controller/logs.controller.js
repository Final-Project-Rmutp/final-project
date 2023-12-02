const client = require('../configs/database.js');

// Get all logs
async function getlogs(req, res) {
    try {
        const result = await client.query(`SELECT logs.log_id , logs.action_type , "user".pin , "user".citizen_id, "user".firstname, logs.log_status, logs.timestamp
        FROM action_logs AS logs
        LEFT JOIN "user" ON logs.user_id = "user".id
        ;`);
        const totalLogs = result.rowCount;
        res.status(200).json({ totalLogs, logs: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get login logs
async function loginlogs(req, res) {
    try {
        const result = await client.query(`SELECT logs.log_id , logs.action_type , "user".pin , "user".citizen_id, "user".firstname, logs.log_status, logs.timestamp
        FROM action_logs AS logs
        LEFT JOIN "user" ON logs.user_id = "user".id
        WHERE logs.action_type like '%login'
        ;`);
        const totalLogs = result.rowCount;
        res.status(200).json({ totalLogs, logs: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get adduser logs
async function adduserlogs(req, res) {
    try {
        const result = await client.query(`SELECT logs.log_id , logs.action_type , "user".pin , "user".citizen_id, "user".firstname, logs.log_status, logs.timestamp
        FROM action_logs AS logs
        LEFT JOIN "user" ON logs.user_id = "user".id
        WHERE logs.action_type like '%adduser'
        ;`);
        const totalLogs = result.rowCount;
        res.status(200).json({ totalLogs, logs: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get updateuser logs
async function updateuserlogs(req, res) {
    try {
        const result = await client.query(`SELECT logs.log_id , logs.action_type , "user".pin , "user".citizen_id, "user".firstname, logs.log_status, logs.timestamp
        FROM action_logs AS logs
        LEFT JOIN "user" ON logs.user_id = "user".id
        WHERE logs.action_type like '%updateuser'
        ;`);
        const totalLogs = result.rowCount;
        res.status(200).json({ totalLogs, logs: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = { getlogs, loginlogs, adduserlogs, updateuserlogs };