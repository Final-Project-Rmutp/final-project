const client = require("../configs/database.js");

async function getreserveddata(req, res) {
    try {
        // Retrieve total reserved
        const totalReservedQuery = 'SELECT COUNT(*) AS total_reserved FROM reservations;';
        const totalReservedResult = await client.query(totalReservedQuery);
        const totalReserved = totalReservedResult.rows[0].total_reserved;

        // Retrieve most reserved room
        const mostReservedQuery = `
            SELECT r.room_number, COUNT(*) AS reservations
            FROM reservations rs
            LEFT JOIN rooms r ON rs.room_id = r.room_id
            GROUP BY r.room_number
            ORDER BY reservations DESC
            LIMIT 1;
        `;
        const mostReservedResult = await client.query(mostReservedQuery);
        const mostReservedRoom = mostReservedResult.rows[0];

        // Retrieve least reserved room
        const leastReservedQuery = `
            SELECT r.room_number, COUNT(*) AS reservations
            FROM reservations rs
            LEFT JOIN rooms r ON rs.room_id = r.room_id
            GROUP BY r.room_number
            ORDER BY reservations ASC
            LIMIT 1;
        `;
        const leastReservedResult = await client.query(leastReservedQuery);
        const leastReservedRoom = leastReservedResult.rows[0];

        // Retrieve most cancelled room
        const mostCancelledQuery = `
            SELECT r.room_number, COUNT(*) AS cancellations
            FROM reservations rs
            LEFT JOIN rooms r ON rs.room_id = r.room_id
            WHERE rs.reservation_status = '0'
            GROUP BY r.room_number
            ORDER BY cancellations DESC
            LIMIT 1;
        `;
        const mostCancelledResult = await client.query(mostCancelledQuery);
        const mostCancelledRoom = mostCancelledResult.rows[0];

        // Construct the response object
        const dashboardData = {
            total_reserved: totalReserved,
            most_reserved_room: mostReservedRoom,
            least_reserved_room: leastReservedRoom,
            most_cancelled_room: mostCancelledRoom
        };

        res.status(200).json(dashboardData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getdaudata(req, res) {
    try {
        const dashboardQuery = `
            SELECT 
                CAST(timestamp AS DATE) AS "Date",
                COUNT(DISTINCT user_id) AS "DAU"
            FROM action_logs
            WHERE action_type_id = 1
            GROUP BY CAST(timestamp AS DATE)
        `;

        const dashboardResult = await client.query(dashboardQuery);
        
        // Format the data for the dashboard response
        const formattedData = dashboardResult.rows.map(row => ({
            x: row.Date.toISOString().split('T')[0], // Extract date portion
            y: row.DAU
        }));

        // Construct the response object
        const response = {
            dataset: formattedData
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = { getreserveddata, getdaudata };