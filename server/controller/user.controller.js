const client = require('../configs/database.js');

// Get all users
async function getallusers(req, res) {
    try {
        const result = await client.query(`SELECT * FROM users`);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}





module.exports = { getallusers};
