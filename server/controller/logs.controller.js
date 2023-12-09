const client = require('../configs/database.js');

// Get all logs
async function getlogs(req, res) {
    try {
        let query = `SELECT logs.log_id, logs.action_type, "user".pin, "user".citizen_id, "user".firstname, logs.log_status, logs.timestamp
        FROM action_logs AS logs
        LEFT JOIN "user" ON logs.user_id = "user".id`;

        const { startDate, endDate } = req.query;
        if (startDate && endDate) {
            const startDate = `${req.query.startDate} 00:00:00`;
            const endDate = `${req.query.endDate} 23:59:59`;
            query += ` WHERE logs.timestamp >= $1 AND logs.timestamp <= $2`;
            const result = await client.query(query, [startDate, endDate]);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        } else {
            const result = await client.query(query);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// Get login logs
async function loginlogs(req, res) {
    try {
        let query = `SELECT logs.log_id, logs.action_type, "user".pin, "user".citizen_id, "user".firstname, logs.log_status, logs.timestamp
        FROM action_logs AS logs
        LEFT JOIN "user" ON logs.user_id = "user".id
        WHERE logs.action_type like '%login%'
        `;

        const { startDate, endDate } = req.query;

        if (startDate && endDate) {
            const startDate = `${req.query.startDate} 00:00:00`;
            const endDate = `${req.query.endDate} 23:59:59`;
            query += ` AND logs.timestamp >= $1 AND logs.timestamp <= $2`;
            const result = await client.query(query, [startDate, endDate]);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        } else {
            const result = await client.query(query);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get adduser logs
async function adduserlogs(req, res) {
    try {
        let query = `SELECT logs.log_id, logs.action_type, "user".pin, "user".citizen_id, "user".firstname, logs.log_status, logs.timestamp
        FROM action_logs AS logs
        LEFT JOIN "user" ON logs.user_id = "user".id
        WHERE logs.action_type like '%adduser%'
        `;

        const { startDate, endDate } = req.query;

        if (startDate && endDate) {
            const startDate = `${req.query.startDate} 00:00:00`;
            const endDate = `${req.query.endDate} 23:59:59`;
            query += ` AND logs.timestamp >= $1 AND logs.timestamp <= $2`;
            const result = await client.query(query, [startDate, endDate]);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        } else {
            const result = await client.query(query);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get updateuser logs
async function updateuserlogs(req, res) {
    try {
        let query = `SELECT logs.log_id, logs.action_type, "user".pin, "user".citizen_id, "user".firstname, logs.log_status, logs.timestamp
        FROM action_logs AS logs
        LEFT JOIN "user" ON logs.user_id = "user".id
        WHERE logs.action_type like '%update%'
        `;

        const { startDate, endDate } = req.query;

        if (startDate && endDate) {
            const startDate = `${req.query.startDate} 00:00:00`;
            const endDate = `${req.query.endDate} 23:59:59`;
            query += ` AND logs.timestamp >= $1 AND logs.timestamp <= $2`;
            const result = await client.query(query, [startDate, endDate]);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        } else {
            const result = await client.query(query);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get deactivate logs
async function deactivatelogs(req, res) {
    try {
        let query = `SELECT logs.log_id, logs.action_type, "user".pin, "user".citizen_id, "user".firstname, logs.log_status, logs.timestamp
        FROM action_logs AS logs
        LEFT JOIN "user" ON logs.user_id = "user".id
        WHERE logs.action_type like '%deactivate%'
        `;

        const { startDate, endDate } = req.query;

        if (startDate && endDate) {
            const startDate = `${req.query.startDate} 00:00:00`;
            const endDate = `${req.query.endDate} 23:59:59`;
            query += ` AND logs.timestamp >= $1 AND logs.timestamp <= $2`;
            const result = await client.query(query, [startDate, endDate]);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        } else {
            const result = await client.query(query);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get addroom logs
async function addroomlogs(req, res) {
    try {
        let query = `SELECT logs.log_id, logs.action_type, "user".pin, "user".citizen_id, "user".firstname, logs.log_status, logs.timestamp
        FROM action_logs AS logs
        LEFT JOIN "user" ON logs.user_id = "user".id
        WHERE logs.action_type like '%addroom%'
        `;

        const { startDate, endDate } = req.query;

        if (startDate && endDate) {
            const startDate = `${req.query.startDate} 00:00:00`;
            const endDate = `${req.query.endDate} 23:59:59`;
            query += ` AND logs.timestamp >= $1 AND logs.timestamp <= $2`;
            const result = await client.query(query, [startDate, endDate]);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        } else {
            const result = await client.query(query);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get updateroom logs
async function updateroomlogs(req, res) {
    try {
        let query = `SELECT logs.log_id, logs.action_type, "user".pin, "user".citizen_id, "user".firstname, logs.log_status, logs.timestamp
        FROM action_logs AS logs
        LEFT JOIN "user" ON logs.user_id = "user".id
        WHERE logs.action_type like '%updateroom%'
        `;

        const { startDate, endDate } = req.query;

        if (startDate && endDate) {
            const startDate = `${req.query.startDate} 00:00:00`;
            const endDate = `${req.query.endDate} 23:59:59`;
            query += ` AND logs.timestamp >= $1 AND logs.timestamp <= $2`;
            const result = await client.query(query, [startDate, endDate]);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        } else {
            const result = await client.query(query);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get deleteroom logs
async function deleteroomlogs(req, res) {
    try {
        let query = `SELECT logs.log_id, logs.action_type, "user".pin, "user".citizen_id, "user".firstname, logs.log_status, logs.timestamp
        FROM action_logs AS logs
        LEFT JOIN "user" ON logs.user_id = "user".id
        WHERE logs.action_type like '%deleteroom%'
        `;

        const { startDate, endDate } = req.query;

        if (startDate && endDate) {
            const startDate = `${req.query.startDate} 00:00:00`;
            const endDate = `${req.query.endDate} 23:59:59`;
            query += ` AND logs.timestamp >= $1 AND logs.timestamp <= $2`;
            const result = await client.query(query, [startDate, endDate]);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        } else {
            const result = await client.query(query);
            const totalLogs = result.rowCount;
            res.status(200).json({ totalLogs, logs: result.rows });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = { getlogs, loginlogs, adduserlogs, updateuserlogs, deactivatelogs, addroomlogs, updateroomlogs, deleteroomlogs };