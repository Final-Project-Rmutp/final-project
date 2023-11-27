const client = require('../configs/database.js');
const jwt =  require('jsonwebtoken');

// Add a new user
async function adduser(req, res) {
    const user = req.body;

    // Check if id and citizen_id are numbers
    if (isNaN(user.id) || isNaN(user.citizen_id)) {
        return res.status(400).json({ message: 'ID and Citizen ID must be numbers' });
    }

        let insertQuery = `insert into "User" (id, citizen_id, firstname, lastname, accounttype) 
                            VALUES ($1, $2, $3, $4 ,$5)`;
        const values = [user.id, user.citizen_id, user.firstname, user.lastname, user.accounttype];
    try {
        await client.query(insertQuery, values);
        res.status(201).json({ message: 'User registration successful'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get all users
async function getallusers(req, res) {
    try {
        const result = await client.query(`SELECT * FROM "User"`);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// Get user by ID
async function getUserById(req, res) {
    try {
        const userId = req.params.id;
        // Query to retrieve user details by ID
        const query = 'SELECT * FROM "User" WHERE id = $1';
        const result = await client.query(query, [userId]);

        if (result.rows.length === 1) {
            const user = result.rows[0];
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}



// Update user account status to 0
async function deactivateUser(req, res) {
    try {
        const userId = req.params.id; 
        // Update query to set accountstatus to 0 for the user with the specified ID
        const updateQuery = 'DELETE FROM "User" WHERE id = $1';
        const result = await client.query(updateQuery, [userId]);
        // console.log(userId)
        if (result.rowCount === 1) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update user account
async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body; 

        // Check if id and citizen_id are numbers
         if (isNaN(updatedUserData.id) || isNaN(updatedUserData.citizen_id)) {
        return res.status(400).json({ message: 'ID and Citizen ID must be numbers' });
         }
        // Extract updated fields from the request body
        const { firstname, lastname, citizen_id } = updatedUserData;
        // Update query to set accountstatus to 0 for the user with the specified ID
        const updateQuery = 'UPDATE "User" SET firstname = $1, lastname =$2 , citizen_id = $3, id = $4  WHERE id = $4';
        const result = await client.query(updateQuery, [firstname, lastname, citizen_id, userId]);
        if (result.rowCount === 1) {
            res.status(200).json({ message: 'User data updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { adduser, getallusers, getUserById, deactivateUser, updateUser };