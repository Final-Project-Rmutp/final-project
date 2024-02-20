const client = require("../configs/database.js");
const { logging } = require("../middleware/loggingMiddleware.js");

// Read RoomSchedule
async function getClassSchedule(req, res) {
    try {
            const { user_id, room_number } = req.query;
            let reservationsQuery = `
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
            `;
            
            const queryConditions = [];
            const queryValues = [];
            if (user_id && !room_number) {
                queryConditions.push(`s.user_id = $${queryValues.length + 1}`);
                queryValues.push(user_id);
            } else if (room_number && !user_id) {
                queryConditions.push(`room_number = $${queryValues.length + 1}`);
                queryValues.push(room_number);
            } else {
                res.status(400).send("Provide either user_id or room_number, not both");
                return;
            }
    
            if (queryConditions.length > 0) {
                reservationsQuery += ` WHERE ${queryConditions.join(' AND ')}`;
            }
            
            const reservationsResult = await client.query(reservationsQuery, queryValues);
        
        // Split reservations if duration is greater than 1 hour
        const formattedReservations = [];
        reservationsResult.rows.forEach(reservation => {
            const { start_time, end_time } = reservation;
            
            const startTime = new Date(`1970-01-01T${start_time}`);
            const endTime = new Date(`1970-01-01T${end_time}`);
            const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
            if (durationInHours > 1) {
                let currentStartTime = startTime;
                while (currentStartTime < endTime) {
                    const currentEndTime = new Date(currentStartTime.getTime() + (60 * 60 * 1000));
                    if (currentEndTime > endTime) {
                        currentEndTime = endTime;
                    }
                    formattedReservations.push({
                        ...reservation,
                        start_time: currentStartTime.toLocaleTimeString('en-US', {hour12: false}),
                        end_time: currentEndTime.toLocaleTimeString('en-US', {hour12: false})
                    });
                    currentStartTime = currentEndTime;
                }
            } else {
                formattedReservations.push(reservation);
            }
        });

        res.status(200).json(formattedReservations);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// Function to check if a room is available for a class at a given time
async function isClassAvailable(roomId, dayOfWeek, startTime, endTime) {
    const checkAvailabilityQuery = `
        SELECT COUNT(*) AS count
        FROM class
        WHERE room_id = $1
            AND day_of_week = $2
            AND (
                (start_time >= $3 AND start_time < $4)
                OR (end_time > $3 AND end_time <= $4)
                OR (start_time <= $3 AND end_time >= $4)
            )
    `;
  
    const values = [roomId, dayOfWeek, startTime, endTime];
    const result = await client.query(checkAvailabilityQuery, values);
    const count = result.rows[0].count;

    if (count == 0){
        return true
    }else{
        return false
    }
}

// Function to add a new class
async function addclass(req, res) {
    try {
        const { room_id, day_of_week, start_time, end_time, subject_id } = req.body;
        
        // Check if the room is available for the new class
        const roomAvailable = await isClassAvailable(room_id, day_of_week, start_time, end_time);

        if (!roomAvailable) {
            return res.status(400).json({ message: 'Room is not available for the new class' });
        }

        // Insert the new class into the database
        const insertClassQuery = `
            INSERT INTO class (subject_id, day_of_week, start_time, end_time, room_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

        const values = [subject_id, day_of_week, start_time, end_time, room_id];
        const classResult = await client.query(insertClassQuery, values);

        const newClass = classResult.rows[0];

        res.status(201).json({ message: 'Class added successfully', newClass });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Function to delete a class
async function deleteclass(req, res) {
    try {
        const { class_id } = req.params;
        // Check if the class exists
        const checkClassQuery = `
            SELECT *
            FROM class
            WHERE class_id = $1;
        `;

        const checkClassResult = await client.query(checkClassQuery, [class_id]);

        if (checkClassResult.rows.length === 0) {
            return res.status(404).json({ message: 'Class not found' });
        }

        // Delete the class
        const deleteClassQuery = `
            DELETE FROM class
            WHERE class_id = $1
            RETURNING *;
        `;

        const deleteClassResult = await client.query(deleteClassQuery, [class_id]);
        const deletedClass = deleteClassResult.rows[0];

        res.status(200).json({ message: 'Class deleted successfully'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Function to update a class
async function updateclass(req, res) {
    try {
        const { class_id } = req.params;
        const { subject_id, day_of_week, start_time, end_time } = req.body;

        // Check if the class exists
        const checkClassQuery = `
            SELECT *
            FROM class
            WHERE class_id = $1;
        `;

        const checkClassResult = await client.query(checkClassQuery, [parseInt(class_id)]);

        if (checkClassResult.rows.length === 0) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const existingClass = checkClassResult.rows[0];

        // Check if the updated time slot is available
        const roomAvailable = await isClassAvailable(existingClass.room_id, existingClass.reservation_date, start_time, end_time);
        
        if (!roomAvailable) {
            return res.status(400).json({ message: 'Updated time slot is not available' });
        }

        // Update the class
        const updateClassQuery = `
            UPDATE class
            SET
                subject_id = $1,
                day_of_week = $2,
                start_time = $3,
                end_time = $4
            WHERE class_id = $5
            RETURNING *;
        `;

        const updateClassResult = await client.query(updateClassQuery, [subject_id, day_of_week, start_time, end_time, parseInt(class_id)]);
        const updatedClass = updateClassResult.rows[0];

        res.status(200).json({ message: 'Class updated successfully', updatedClass });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Create class
async function createClassTest(req, res) {
    try {
        const userId = req.user.id;

        // Validate input data
        const { name, courseCode, room, classInfo, startDate, endDate, selectedSlots } = req.body;
        if (!name || !courseCode || !room || !classInfo || !startDate || !endDate || !selectedSlots) {
            res.status(400).json({ message: 'Invalid input data' });
            return;
        }

        const insertClassQuery = `
            INSERT INTO classtest (user_id, name, course_code, room, class_info, start_date, end_date, timestamp)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
            RETURNING *;
        `;

        // Iterate over selectedSlots and insert each slot into the database
        for (const day in selectedSlots) {
            for (const slot of selectedSlots[day]) {
                const values = [
                    userId,
                    slot.name || name,
                    slot.courseCode || courseCode,
                    slot.room || room,
                    slot.classInfo || classInfo,
                    slot.startDate || startDate,
                    slot.endDate || endDate,
                ];

                try {
                    const result = await client.query(insertClassQuery, values);
                    const insertedClass = result.rows[0];
                    // You can do further processing or error handling here
                } catch (error) {
                    console.error('Error inserting class:', error);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }
            }
        }

        res.status(201).json({ message: 'Class created successfully' });
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getSchedule(req, res) {
    try {
      const query = 'SELECT * FROM classtest';
      const result = await client.query(query);
  
      const scheduleData = result.rows;
  
      res.status(200).json(scheduleData);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

module.exports = { getClassSchedule, addclass, deleteclass, updateclass, createClassTest,getSchedule };