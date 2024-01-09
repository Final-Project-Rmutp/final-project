const client = require('../configs/database.js');

// Get all logs
async function getlogs(req, res) {
    try {
        let query = `SELECT logs.logs_id, action_type.action_type_name, "user".pin, "user".citizen_id, "user".firstname, logs.action_status, logs.logs_message, logs.timestamp
        FROM action_logs AS logs
        LEFT JOIN "user" ON logs.user_id = "user".id
        LEFT JOIN action_type ON logs.action_type_id = action_type.action_type_id`;

        const { startDate, endDate, action_type_name, action_status } = req.query;
        const values = [];

        if (startDate && endDate) {
            const startDateTime = `${startDate} 00:00:00`;
            const endDateTime = `${endDate} 23:59:59`;
            query += ` WHERE logs.timestamp >= $1 AND logs.timestamp <= $2`;
            values.push(startDateTime, endDateTime);
        }

        if (action_type_name) {
            if (values.length === 0) {
                query += ` WHERE`;
            } else {
                query += ` AND`;
            }
            query += ` action_type.action_type_name = $${values.length + 1}`;
            values.push(action_type_name);
        }

        if (action_status) {
            if (values.length === 0) {
                query += ` WHERE`;
            } else {
                query += ` AND`;
            }
            query += ` logs.action_status = $${values.length + 1}`;
            values.push(action_status);
        }

        const result = await client.query(query, values);
        const totalLogs = result.rowCount;
        res.status(200).json({ totalLogs, logs: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getlogs };