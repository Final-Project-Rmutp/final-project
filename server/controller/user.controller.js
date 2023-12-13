const client = require('../configs/database.js');

// Get users profile
async function getprofile(req, res) {
    try {
        const userId = req.user.id;
        const query = `SELECT firstname, user_img_path FROM "user" WHERE id = $1`;
        const result = await client.query(query, [userId]);
        const profile = result.rows[0];

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error fetching profile data' });
    }
}


module.exports = { getprofile };
