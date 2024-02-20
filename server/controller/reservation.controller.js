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
      const { room_capacity, room_level, room_type, room_number, reservation_date, start_time, end_time, page = 1, pageSize = 10 } = req.body;
      const offset = (page - 1) * pageSize;

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
              AND reservation_status = 2
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
          LIMIT $8 OFFSET $9;
      `;

      const availableRoomsResult = await client.query(availableRoomsQuery, [
          room_capacity || null,
          room_level || null,
          room_type || null,
          room_number || null,
          reservation_date,
          start_time,
          end_time,
          pageSize,
          offset
      ]);

      const availableRooms = availableRoomsResult.rows;
      if (availableRooms.length > 0) {
          return res.status(200).json({ availableRooms });
      } else {
          const recommendedRoomsQuery = `
              SELECT room_id, room_level, room_type, room_number
              FROM rooms
              WHERE room_capacity >= $1
              LIMIT 5; 
          `;

          const recommendedRoomsResult = await client.query(recommendedRoomsQuery, [room_capacity]);

          const recommendedRooms = recommendedRoomsResult.rows;

          return res.status(200).json({
              message: 'No available rooms at the specified time',
              recommended_rooms: recommendedRooms
          });
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal server error' });
  }
}

async function isRoomAvailable(roomId, reservationDate, startTime, endTime) {
    const checkAvailabilityQuery = `
    SELECT COUNT(*) AS count
    FROM (
      SELECT room_id
      FROM reservations
      WHERE room_id = $1
        AND reservation_date = $2
        AND (
          (start_time >= $3 AND start_time < $4)
          OR (end_time > $3 AND end_time <= $4)
          OR (start_time <= $3 AND end_time >= $4)
        )
        AND reservation_status = 2
      UNION ALL
      SELECT room_id
      FROM class
      WHERE room_id = $1
        AND day_of_week = TO_CHAR($2::date, 'Day'::text)
        AND (
          (start_time >= $3 AND start_time < $4)
          OR (end_time > $3 AND end_time <= $4)
          OR (start_time <= $3 AND end_time >= $4)
        )
    ) AS combined_table;
  `;
  
    const values = [roomId, reservationDate, startTime, endTime];
    const result = await client.query(checkAvailabilityQuery, values);
    const count = result.rows[0].count;

    if (count == 0){
        return true
    }else{
        return false
    }
  }

async function reservation(req, res) {
  const action_type = 13; // reservation
  const currentDate = new Date();
    try {
      // Extract reservation details from the request body
      const { room_id, reservation_date, start_time, end_time, reservation_reason } = req.body;
      const userId = req.user.id

      // Validate reservation_date against the current date
    if (new Date(reservation_date) < currentDate) {
      return res.status(400).json({ message: 'Reservation date cannot be in the past' });
    }

      // Check if the user and room exist (you may need additional validation)
      const userQuery = 'SELECT id FROM "user" WHERE id = $1';
      const roomQuery = 'SELECT room_id FROM rooms WHERE room_id = $1';
  
      const userResult = await client.query(userQuery, [userId]);
      const roomResult = await client.query(roomQuery, [room_id]);
  
      if (userResult.rows.length === 0 || roomResult.rows.length === 0) {
        return res.status(404).json({ message: 'User or room not found' });
      }

      // Check if the room is available in both reservations and class tables
      const roomAvailable = await isRoomAvailable(room_id, reservation_date, start_time, end_time);
      if (!roomAvailable) {
        return res.status(400).json({ message: 'Room is not available during the specified time' });
      }
      
      // Insert reservation into the reservations table
      const insertReservationQuery = `
        INSERT INTO reservations (room_id, user_id, reservation_date, start_time, end_time, reservation_reason)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
  
      const values = [room_id, userId, reservation_date, start_time, end_time, reservation_reason];
      const reservationResult = await client.query(insertReservationQuery, values);
  
      const newReservation = reservationResult.rows[0];
      const insertedId = reservationResult.rows[0].reservation_id;
      logging(action_type, userId, "Success", `Room reservation successful. Reservation ID: ${insertedId}`);
      res.status(201).json({ message: 'Reservation created successfully', reservation: newReservation });
    } catch (error) {
      console.error(error.message);
      logging(action_type, userId, "Error", err.message);
      // Handle specific errors if needed
      if (error.code === '23505') {
        // Unique violation (e.g., duplicate reservation for the same user and room)
        return res.status(400).json({ message: 'Duplicate reservation' });
      }
  
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get current reservation
  async function getreservation(req, res) {
    try {
        const { reservation_status, reservation_date } = req.query;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const offset = (page - 1) * pageSize;

        if (page < 1 || pageSize < 1 || pageSize > 100) {
            return res.status(400).json({
                message:
                    "Page number must be 1 or greater, pageSize must be greater than 0, and not exceed 100",
            });
        }

        const whereConditions = [];
        const values = [pageSize, offset];

        if (reservation_status) {
            whereConditions.push(`rs.reservation_status = $${values.length + 1}`);
            values.push(reservation_status);
        }

        if (reservation_date) {
            whereConditions.push(`rs.reservation_date = $${values.length + 1}`);
            values.push(reservation_date);
        }

        const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

        const query = `
            SELECT
                rs.reservation_id,
                CONCAT(u.firstname, ' ', u.lastname) AS fullname,
                u.account_type,
                r.room_number,
                rs.reservation_reason,
                rs.reservation_status,
                rs.reservation_date,
                rs.timestamp,
                rs.start_time,
                rs.end_time
            FROM reservations rs
            LEFT JOIN "user" u ON rs.user_id = u.id
            LEFT JOIN rooms r ON rs.room_id = r.room_id
            ${whereClause}
            ORDER BY timestamp DESC
            LIMIT $1 OFFSET $2`;

        const result = await client.query(query, values);
        const transformedRows = result.rows.map(row => ({
            ...row,
            reservation_status: transformReservationStatus(row.reservation_status),
        }));
        const totalreserve = result.rowCount;
        res.status(200).json({ totalreserve, reservelist: transformedRows });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error fetching reports" });
    }
}


  // Function to transform reservation_status values
function transformReservationStatus(status) {
    switch (status) {
      case 0:
        return 'Cancel';
      case 1:
        return 'In progress';
      case 2:
        return 'Approve';
      default:
        return 'unknown';
    }
  }

// Function to update a reservation status (eg. 0 = cancel, 1 = in progress, 2 = approve)
async function updatestatus(req, res) {
  try {
      const { reservation_id, reservation_status } = req.query;

      // Check if the reservation exists
      const checkReservationQuery = `
          SELECT *
          FROM reservations
          WHERE reservation_id = $1;
      `;

      const checkReservationResult = await client.query(checkReservationQuery, [reservation_id]);

      if (checkReservationResult.rows.length === 0) {
          return res.status(404).json({ message: 'Reservation not found' });
      }

      const existingReservation = checkReservationResult.rows[0];

      // Check if the time slot is available before updating the status
      const roomAvailable = await isRoomAvailable(existingReservation.room_id, existingReservation.reservation_date, existingReservation.start_time, existingReservation.end_time);

      if (!roomAvailable) {
          return res.status(400).json({ message: 'Time slot is not available' });
      }

      // Update the reservation status
      const updateStatusQuery = `
          UPDATE reservations
          SET reservation_status = $2
          WHERE reservation_id = $1;
      `;

      await client.query('BEGIN'); 

      await client.query(updateStatusQuery, [reservation_id, reservation_status]);

      if (reservation_status === '2') { // If updating status to 'reserved'

        const updateOtherReservationsQuery = `
        UPDATE reservations
        SET reservation_status = '0'
        WHERE room_id = $1
        AND reservation_date = $2
        AND start_time >= $3
        AND end_time <= $4
        AND reservation_id <> $5; -- Exclude the current reservation
    `;

    await client.query(updateOtherReservationsQuery, [existingReservation.room_id, existingReservation.reservation_date, existingReservation.start_time, existingReservation.end_time, reservation_id]);
      }

      await client.query('COMMIT');

      res.status(200).json({ message: 'Reservation status updated successfully' });
  } catch (err) {
      await client.query('ROLLBACK');
      console.error(err.message);
      res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getRoomSchedule, searchroom, reservation, getreservation, updatestatus };