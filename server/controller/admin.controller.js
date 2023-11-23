const client = require('../configs/database.js');
const jwt =  require('jsonwebtoken');

// Add a new user
async function Adduser(req, res) {
    const user = req.body;

        let insertQuery = `insert into "User" (id, citizen_id, firstname, lastname, accounttype) 
                            VALUES ($1, $2, $3, $4 ,$5)`;
        const values = [user.id, user.citizen_id, user.firstname, user.lastname, user.accounttype];
    try {
        await client.query(insertQuery, values);
        res.status(201).json({ message: 'Insertion was successful'});
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


module.exports = { Adduser, getallusers};