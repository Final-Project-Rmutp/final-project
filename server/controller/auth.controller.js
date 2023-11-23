const client = require('../configs/database.js');
const jwt =  require('jsonwebtoken');
const { jwtSecret } = require('../configs/jwt.js');

// login
async function login(req, res) {
    const { id, citizen_id } = req.body;

    // Check if the user with the provided username or email exists in the database
    const query = `
        SELECT id, citizen_id, accounttype , accountrole
        FROM "User"
        WHERE id = $1`;

    try {
        const result = await client.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const user = result.rows[0];

        // Compare the provided password
        const passwordMatch = citizen_id === user.citizen_id;

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Generate and send a JSON Web Token (JWT) for authentication
        const token = jwt.sign({ id: user.id, citizen_id: user.citizen_id, accounttype: user.accounttype, accountrole: user.accountrole}, jwtSecret);
        res.status(200).json({ message: 'Authentication successful', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { login };
