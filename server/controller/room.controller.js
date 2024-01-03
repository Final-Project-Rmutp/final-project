const client = require('../configs/database.js');
const { logging } = require('../middleware/loggingMiddleware.js');

//Create room
async function addroom(req, res) {
    const { room_number, room_level, room_capacity, room_type, facilities_id } = req.body;

    const missingFields = !room_number || !room_capacity || !room_level || !room_type || facilities_id === undefined;
    if (missingFields) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const areNumbersInvalid = isNaN(room_capacity) || isNaN(room_level);
    if (areNumbersInvalid) {
        return res.status(400).json({ message: 'Room Capacity and Room Level must be numbers' });
    }

    try {
        const roomNumberCheckQuery = `SELECT room_number FROM rooms WHERE room_number = $1`;
        const roomNumberCheckResult = await client.query(roomNumberCheckQuery, [room_number]);

        if (roomNumberCheckResult.rows.length > 0) {
            return res.status(400).json({ message: 'Room Number already exists' });
        }

        // Start a transaction to insert room and room facilities together
        await client.query('BEGIN');

        const insertRoomQuery = `
            INSERT INTO rooms (room_number, room_level, room_capacity, room_type) 
            VALUES ($1, $2, $3, $4)
            RETURNING room_id`;

        const roomValues = [room_number, room_level, room_capacity, room_type];
        const roomResult = await client.query(insertRoomQuery, roomValues);
        const roomId = roomResult.rows[0].room_id;

        // Insert room facilities if available
        if (facilities_id.length > 0) {
            const insertRoomFacilityQuery = `
                INSERT INTO roomfacility (room_id, facility_id)
                VALUES ($1, $2)
            `;
    
            for (const facilityId of facilities_id) {
                await client.query(insertRoomFacilityQuery, [roomId, facilityId]);
            }
        }

        await client.query('COMMIT');

        const userId = req.user.id;
        logging("addroom", userId, `Room addition successful, room_id: ${roomId}`);

        res.status(201).json({ message: 'Room addition successful' });
    } catch (err) {
        await client.query('ROLLBACK');

        const userId = req.user.id;
        console.error(err.message);
        logging("error addroom", userId, err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Read room data
async function getallroom(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const offset = (page - 1) * pageSize;

        if (page < 1 || pageSize < 1 || pageSize > 100) {
            return res.status(400).json({
                message: 'Page number must be 1 or greater, pageSize must be greater than 0, and not exceed 100'
            });
        }

        const roomsQuery = `
            SELECT r.room_id, r.room_number, r.room_type, r.room_capacity, r.room_level, r.room_status, array_agg(f.facility_name) as room_facilities
            FROM rooms r
            LEFT JOIN roomfacility rf ON r.room_id = rf.room_id
            LEFT JOIN facility f ON rf.facility_id = f.facility_id
            GROUP BY r.room_id
            ORDER BY r.room_id
            LIMIT $1 OFFSET $2
        `;

        const roomsResult = await client.query(roomsQuery, [pageSize, offset]);

        const roomsArray = roomsResult.rows.map(row => {
            const {
                room_id,
                room_number,
                room_type,
                room_capacity,
                room_level,
                room_facilities,
                room_status
            } = row;

            return {
                room_id: room_id.toString(),
                room_number: room_number.toString(),
                room_type,
                room_capacity: room_capacity.toString(),
                room_level,
                room_facilities: room_facilities || [],
                room_status
                // Add other room properties here
            };
        });

        res.status(200).json(roomsArray);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Read room data by room_id
async function getroomById(req, res) {
    try {
        const roomId = req.params.room_id;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const offset = (page - 1) * pageSize;

        if (page < 1 || pageSize < 1 || pageSize > 100) {
            return res.status(400).json({
                message: 'Page number must be 1 or greater, pageSize must be greater than 0, and not exceed 100'
            });
        }

        const roomsQuery = `
            SELECT r.room_id, r.room_number, r.room_type, r.room_capacity, r.room_level, f.facility_name, r.room_status
            FROM rooms r
            LEFT JOIN roomfacility rf ON r.room_id = rf.room_id
            LEFT JOIN facility f ON rf.facility_id = f.facility_id
            WHERE r.room_id = $1
        `;

        const roomsResult = await client.query(roomsQuery, [roomId]);

        const roomData = {};
        roomsResult.rows.forEach(row => {
            const { room_id, room_number, room_type, room_capacity, room_level, facility_name, room_status } = row;
            if (!roomData[room_id]) {
                roomData[room_id] = {
                    room_id: room_id.toString(),
                    room_number: room_number.toString(),
                    room_type,
                    room_capacity: room_capacity.toString(),
                    room_level,
                    room_facilities: [],
                    room_status
                    // Add other room properties here
                };
            }
            if (facility_name) {
                roomData[room_id].room_facilities.push(facility_name);
            }
        });

        const roomsArray = Object.values(roomData);
        res.status(200).json(roomsArray);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Update room data
async function updateroom(req, res) {
    const roomId = req.params.room_id;
    const { room_number, room_level, room_capacity, room_type, facilities_id, room_status } = req.body;

    const missingFields = !room_number || !room_capacity || !room_level || !room_type || facilities_id === undefined || !room_status;
    if (missingFields) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const areNumbersInvalid = isNaN(roomId) || isNaN(room_capacity) || isNaN(room_level);
    if (areNumbersInvalid) {
        return res.status(400).json({ message: 'Room ID, Room Capacity, and Room Level must be numbers' });
    }

    try {
        // Start a transaction for updating room and its facilities
        await client.query('BEGIN');

        const updateRoomQuery = `
            UPDATE rooms 
            SET room_number = $1, room_level = $2, room_capacity = $3, room_type = $4, room_status = $5
            WHERE room_id = $6
        `;

        const roomValues = [room_number, room_level, room_capacity, room_type, room_status, roomId];
        await client.query(updateRoomQuery, roomValues);

        // Delete existing room facilities before inserting updated ones
        const deleteRoomFacilitiesQuery = `
            DELETE FROM roomfacility 
            WHERE room_id = $1
        `;
        await client.query(deleteRoomFacilitiesQuery, [roomId]);

        // Insert updated room facilities if available
        if (facilities_id.length > 0) {
            const insertRoomFacilityQuery = `
                INSERT INTO roomfacility (room_id, facility_id)
                VALUES ($1, $2)
            `;
    
            for (const facilityId of facilities_id) {
                await client.query(insertRoomFacilityQuery, [roomId, facilityId]);
            }
        }

        await client.query('COMMIT');

        const userId = req.user.id;
        logging("updateroom", userId, `Room update successful, room_id: ${roomId}`);

        res.status(200).json({ message: 'Room update successful' });
    } catch (err) {
        await client.query('ROLLBACK');

        const userId = req.user.id;
        console.error(err.message);
        logging("error updateroom", userId, err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}



//Delete room
async function deleteroom(req, res) {
    const { room_id } = req.params; // Assuming room_id is passed as a route parameter

    if (!room_id || isNaN(room_id)) {
        return res.status(400).json({ message: 'Invalid Room ID' });
    }

    try {
        // Start a transaction for deleting room and its facilities
        await client.query('BEGIN');

        // Delete room facilities associated with the room
        const deleteRoomFacilitiesQuery = `
            DELETE FROM roomfacility 
            WHERE room_id = $1
        `;
        await client.query(deleteRoomFacilitiesQuery, [room_id]);

        // Delete the room itself
        const deleteRoomQuery = `
            DELETE FROM rooms 
            WHERE room_id = $1
        `;
        await client.query(deleteRoomQuery, [room_id]);

        await client.query('COMMIT');

        const userId = req.user.id;
        logging("deleteroom", userId, `Room deletion successful, room_id: ${room_id}`);

        res.status(200).json({ message: 'Room deletion successful' });
    } catch (err) {
        await client.query('ROLLBACK');

        const userId = req.user.id;
        console.error(err.message);
        logging("error deleteroom", userId, err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}





module.exports = { addroom, getallroom, getroomById, updateroom, deleteroom };
