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

async function searchroom(req, res) {
    try {
        const { room_capacity, room_level, room_type, room_number, reservation_date, start_time, end_time } = req.body;

        // 1. Identify available rooms at the specified time
        const availableRoomsQuery = `
            SELECT room_id, room_level, room_type, room_number
            FROM rooms
            WHERE 
            ($1::integer IS NULL OR room_capacity >= $1::integer)
            AND ($2::text IS NULL OR room_level = $2)
            AND ($3::text IS NULL OR room_type = $3)
            AND ($4::text IS NULL OR room_number = $4)
            AND room_id NOT IN (
                SELECT room_id
                FROM reservations
                WHERE reservation_date = $5
                AND (
                    (start_time >= $6 AND start_time < $7)
                    OR (end_time > $6 AND end_time <= $7)
                    OR (start_time <= $6 AND end_time >= $7)
                )
            )
            AND room_id NOT IN (
                SELECT room_id
                FROM class
                WHERE day_of_week = TO_CHAR($5::date, 'Day'::text)
                AND (
                    (start_time >= $6 AND start_time < $7)
                    OR (end_time > $6 AND end_time <= $7)
                    OR (start_time <= $6 AND end_time >= $7)
                )
            )
        `;

        const availableRoomsResult = await client.query(availableRoomsQuery, [
            room_capacity || null,
            room_level || null,
            room_type || null,
            room_number || null,
            reservation_date,
            start_time,
            end_time
        ]);

        const availableRooms = availableRoomsResult.rows;
        if (availableRooms.length > 0) {

            return res.status(200).json({ availableRooms });
        } else {

            const recommendedRoomsQuery = `
                SELECT room_id, room_level, room_type, room_number
                FROM rooms
                WHERE room_capacity >= $1
                LIMIT 5; -- You can adjust the number of recommendations
            `;

            const recommendedRoomsResult = await client.query(recommendedRoomsQuery, [room_capacity]);

            const recommendedRooms = recommendedRoomsResult.rows;

            return res.status(404).json({
                message: 'No available rooms at the specified time',
                recommended_rooms: recommendedRooms
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}




module.exports = { getRoomSchedule, searchroom };