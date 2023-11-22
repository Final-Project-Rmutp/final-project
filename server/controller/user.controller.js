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

const getCurrentUser = (req, res) => {
    // Assuming you have a middleware that adds the user information to the request
    const currentUser = req.user;
  
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    return res.status(200).json(currentUser);
  };



module.exports = { getallusers,getCurrentUser};
