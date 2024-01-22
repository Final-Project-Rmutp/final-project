const client = require('../configs/database.js');

// Get users profile
async function getprofile(req, res) {
    try {
        const userId = req.user.id;
        const query = `SELECT firstname, user_img_path FROM "user" WHERE id = $1`;
        const result = await client.query(query, [userId]);
        const profile = result.rows[0];

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error fetching profile data' });
    }
}

// Read RoomSchedule
async function getschedule(req, res) {
    try {
        const reservationsQuery = `
            SELECT
                c.class_id AS reservation_id,
                s.subject_name,
                CONCAT(u.firstname, ' ', u.lastname) AS fullname,
                r.room_number,
                c.day_of_week,
                c.start_time,
                c.end_time
            FROM class c
            LEFT JOIN rooms r ON c.room_id = r.room_id
            LEFT JOIN subjects s ON c.subject_id = s.subject_id
            LEFT JOIN "user" u ON s.user_id = u.id
            WHERE u.id = $1;
        `;
        
        const userId = req.user.id
        const reservationsResult = await client.query(reservationsQuery, [userId]);

        // Organize reservations by room_number and day_of_week
        const reservationsByRoom = reservationsResult.rows.reduce((acc, row) => {
            const { room_number, day_of_week, subject_name, start_time, end_time } = row;

            if (!acc[room_number]) {
                acc[room_number] = {};
            }

            acc[room_number][day_of_week] = [...(acc[room_number][day_of_week] || []), { subject_name, start_time, end_time }];

            return acc;
        }, {});

        // Ensure all rooms have an entry for each day of the week
        const uniqueRoomNumbers = [...new Set(reservationsResult.rows.map(row => row.room_number))];
        const allDaysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        const formattedResponse = uniqueRoomNumbers.reduce((acc, room_number) => {
            acc[room_number] = allDaysOfWeek.reduce((daysAcc, day) => {
                daysAcc[day] = reservationsByRoom[room_number]?.[day] || [];
                return daysAcc;
            }, {});
            return acc;
        }, {});

        res.status(200).json(formattedResponse);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getprofile, getschedule };
