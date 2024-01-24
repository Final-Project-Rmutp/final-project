const client = require("../configs/database.js");

async function getbookingData(req, res){
    try {
        let query = `
            SELECT rooms.room_number, 
                   reservations.reservation_status, 
                   COUNT(*) as status_count
            FROM reservations
            JOIN rooms ON reservations.room_id = rooms.room_id
            GROUP BY rooms.room_number, reservations.reservation_status;
        `;

        const result = await client.query(query);

        if (result.rows.length > 0) {
            result.rows.forEach(row => {
                if (row.reservation_status === 0) {
                    row.reservation_status = "Canceled";
                } else if (row.reservation_status === 1) {
                    row.reservation_status = "In progress";
                }
                else if (row.reservation_status === 2) {
                    row.reservation_status = "Approve";
                }
            });

            res.status(200).json(result.rows);
        } else {
            res.status(404).json({ message: 'No data found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getcancellationData(req, res) {
    try {
        let query = `
            SELECT rooms.room_number, 
                   reservations.reservation_status, 
                   COUNT(*) as status_count
            FROM reservations
            JOIN rooms ON reservations.room_id = rooms.room_id
            WHERE reservations.reservation_status = 0
            GROUP BY rooms.room_number, reservations.reservation_status
            ORDER BY status_count DESC;
        `;

        const result = await client.query(query);

        if (result.rows.length > 0) {
            result.rows.forEach(row => {
                if (row.reservation_status === 0) {
                    row.reservation_status = "Canceled";
                } else if (row.reservation_status === 1) {
                    row.reservation_status = "In progress";
                }
                else if (row.reservation_status === 2) {
                    row.reservation_status = "Approve";
                }
            });

            res.status(200).json(result.rows);
        } else {
            res.status(404).json({ message: 'No data found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getfrequentUseData(req, res) {
    try {
        let query = `
            SELECT rooms.room_number, 
                   reservations.reservation_status, 
                   COUNT(*) as status_count
            FROM reservations
            JOIN rooms ON reservations.room_id = rooms.room_id
            GROUP BY rooms.room_number, reservations.reservation_status
            ORDER BY status_count DESC
        `;

        const result = await client.query(query);

        if (result.rows.length > 0) {
            result.rows.forEach(row => {
                if (row.reservation_status === 0) {
                    row.reservation_status = "Canceled";
                } else if (row.reservation_status === 1) {
                    row.reservation_status = "In progress";
                }
                else if (row.reservation_status === 2) {
                    row.reservation_status = "Approve";
                }
            });

            res.status(200).json(result.rows);
        } else {
            res.status(404).json({ message: 'No data found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getrarelyUsedData (req, res){
    try { let query = `SELECT rooms.room_number, reservations.reservation_status, COUNT(*) as status_count
    FROM reservations
    JOIN rooms ON reservations.room_id = rooms.room_id
    GROUP BY rooms.room_number, reservations.reservation_status
    ORDER BY status_count ASC`;
    
    const result = await client.query(query);
    if (result.rows.length > 0) {
        result.rows.forEach(row => {
            if (row.reservation_status === 0) {
                row.reservation_status = "Canceled";
            } else if (row.reservation_status === 1) {
                row.reservation_status = "In progress";
            }
            else if (row.reservation_status === 2) {
                row.reservation_status = "Approve";
            }
        });
        res.status(200).json(result.rows);
    } else {
        res.status(404).json({ message: 'No data found' });
    }
    } catch (error) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getbookingData , getcancellationData , getfrequentUseData , getrarelyUsedData };