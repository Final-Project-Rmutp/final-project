const client = require('../configs/database.js');
const { logging } = require('../middleware/loggingMiddleware.js');

// TODO: Create room
async function addroom(req, res) {
    const { room_number, room_type, room_capacity, room_facilities, room_level } = req.body;

        let insertQuery = `insert into "rooms" (room_number, room_type, room_capacity, room_facilities, room_level) 
                            VALUES ($1, $2, $3, $4, $5)
                            RETURNING room_id`;
        const values = [room_number, room_type, room_capacity, room_facilities, room_level];
        
    try {

        // Check if the pin already exists in the database
        const room_numberCheckQuery = `SELECT room_number FROM "rooms" WHERE room_number = $1`;
        const room_numberCheckResult = await client.query(room_numberCheckQuery, [room_number]);

        if (room_numberCheckResult.rows.length > 0) {
            return res.status(400).json({ message: 'Room Number already exists' });
        }

        const result = await client.query(insertQuery, values);
        const insertedId = result.rows[0].room_id;
        const id = req.user.id;

        logging("addroom", id,'Room additional successful room_id: '+insertedId);
        res.status(201).json({ message: 'Room additional successful'});
    } catch (err) {
        const id = req.user.id;
        console.error(err.message);
        logging("error addroom", id, err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// TODO: Read room data
async function getallroom(req, res) {
    try {
        const result = await client.query(`SELECT room_id, room_number, room_type, room_capacity, room_facilities, room_level, room_status FROM "rooms" 
        ORDER BY room_id`);
        res.status(200).json(result.rows); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// TODO: Read room data by room_id
async function getroomById(req, res) {
    try {
        const roomId = req.params.room_id;
        // Query to retrieve user details by ID
        const query = `SELECT room_id, room_number, room_type, room_capacity, room_facilities, room_level, room_status FROM "rooms"
        WHERE room_id = $1 
        ORDER BY room_id`; // select แค่จำเป็น
        const result = await client.query(query, [roomId]);

        if (result.rows.length === 1) {
            const user = result.rows[0];
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// TODO: Update room data
async function updateroom(req, res) {
    try {
        const roomId = req.params.room_id;
        const updatedRoomData = req.body; 
        // Extract updated fields from the request body
        const { room_number, room_type, room_capacity, room_facilities, room_level, room_status} = updatedRoomData;

        const updateQuery = 'UPDATE "rooms" SET room_number = $1, room_type =$2 , room_capacity = $3, room_facilities = $4, room_level = $5, room_status = $6  WHERE room_id = $7';
        const result = await client.query(updateQuery, [room_number, room_type, room_capacity, room_facilities, room_level, room_status, roomId]);
        if (result.rowCount === 1) {
            const id = req.user.id;
            logging("updateroom", id,"Room data updated successfully id: "+roomId)
            res.status(200).json({ message: 'Room data updated successfully' });
        } else {
            const id = req.user.id;
            logging("error updateroom", id, "Room not found id: "+roomId);
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (err) {
        console.error(err.message);
        const id = req.user.id;
        logging("error updateroom", id, err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// TODO: Delete room
async function deleteroom(req, res) {
    try {
        const roomId = req.params.room_id;
        const updateQuery = 'DELETE FROM "rooms" WHERE room_id = $1';
        const result = await client.query(updateQuery, [roomId]);
        const id = req.user.id;
        // console.log(userId)
        if (result.rowCount === 1) {
            logging("deleteroom",id,"Room Delete successfully id: "+roomId)
            res.status(200).json({ message: 'Room Delete successfully' });
        } else {
            const id = req.user.id;
            logging("error deleteroom", id, "Room not found id: "+roomId);
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (err) {
        console.error(err.message);
        const id = req.user.id;
        logging("error deleteroom", id, err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = { addroom, getallroom, getroomById, updateroom, deleteroom };
