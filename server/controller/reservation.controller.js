const client = require("../configs/database.js");
const { logging } = require("../middleware/loggingMiddleware.js");

// Read RoomSchedule
async function getRoomSchedule(req, res) {
    try {
        const { room_id, weeks = 0 } = req.query;
        
        const reservationsQuery = `
            SELECT
                room_id,
                TRIM(day_of_week) AS day_of_week,
                start_time,
                end_time
            FROM (
                SELECT
                    class_id AS reservation_id,
                    room_id,
                    day_of_week,
                    start_time,
                    end_time
                FROM class
                WHERE room_id = $1

                UNION ALL

                SELECT
                    reservation_id,
                    room_id,
                    TO_CHAR(reservation_date,'Day') AS day_of_week,
                    start_time,
                    end_time
                FROM reservations
                WHERE room_id = $1
                AND EXTRACT(WEEK FROM reservation_date) = EXTRACT(WEEK FROM CURRENT_DATE + $2::INTERVAL)
            ) AS AllReservations;
        `;
        const reservationsResult = await client.query(reservationsQuery, [ room_id, `${weeks} week`]);
        // Organize reservations by day_of_week
        const reservationsByDay = reservationsResult.rows.reduce((acc, row) => {
            const { day_of_week, start_time, end_time } = row;

            if (!acc[day_of_week]) {
                acc[day_of_week] = [];
            }

            acc[day_of_week].push({ start_time, end_time });

            return acc;
        }, {});

        // Ensure all days of the week are present in the response
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const formattedResponse = daysOfWeek.reduce((acc, day) => {
            acc[day] = reservationsByDay[day] || [];
            return acc;
        }, {});

        res.status(200).json(formattedResponse);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getRoomSchedule };