const client = require('../configs/database.js');

// Get users profile
async function getprofile(req, res) {
    try {
        const userId = req.user.id;
        const result = await client.query(`SELECT firstname,user_img_path FROM "User" WHERE id = $1`,[userId]);
        const profile = result.rows[0];
        res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getprofile };
