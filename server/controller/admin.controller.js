const client = require('../configs/database.js');
const jwt =  require('jsonwebtoken');

// Add a new user
async function adduser(req, res) {
    const user = req.body;

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
        const updateQuery = 'UPDATE "User" SET accountstatus = 0 WHERE id = $1';
        const result = await client.query(updateQuery, [userId]);
        // console.log(userId)
        if (result.rowCount === 1) {
            res.status(200).json({ message: 'User account deactivated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}




module.exports = { adduser, getallusers, getUserById, deactivateUser };