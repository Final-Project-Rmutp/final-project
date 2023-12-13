const client = require('../configs/database.js');
const jwt =  require('jsonwebtoken');
const { logging } = require('../middleware/loggingMiddleware.js');

// Add a new user
async function adduser(req, res) {
    const { pin, citizen_id, firstname, lastname, account_type, user_img_path } = req.body;

    // Check for missing or empty values (except user_img_path)
    const requiredFields = [pin, citizen_id, firstname, lastname, account_type];
    if (requiredFields.some(field => !field)) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const pinRegex = /^\d{12}-\d$/; // Regex to match "000000000000-0" format
    if (!pinRegex.test(pin) || isNaN(citizen_id)) {
        return res.status(400).json({ message: 'ID and Citizen ID must be numbers in the correct format' });
    }

    try {
        const pinCheckQuery = `SELECT id FROM "user" WHERE pin = $1`;
        const pinCheckResult = await client.query(pinCheckQuery, [pin]);

        if (pinCheckResult.rows.length > 0) {
            return res.status(400).json({ message: 'PIN already exists' });
        }

        const insertQuery = `INSERT INTO "user" (pin, citizen_id, firstname, lastname, account_type, user_img_path) 
                            VALUES ($1, $2, $3, $4, $5, $6)
                            RETURNING id`;
        const values = [pin, citizen_id, firstname, lastname, account_type, user_img_path];

        const result = await client.query(insertQuery, values);
        const insertedId = result.rows[0].id;
        const id = req.user.id;

        logging("adduser", id, `User registration successful. User ID: ${insertedId}, Details: ${JSON.stringify(req.body)}`);
        res.status(201).json({ message: 'User registration successful' });
    } catch (err) {
        const id = req.user.id;
        console.error(err.message);
        logging("error adduser", id, err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get all users
async function getallusers(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const offset = (page - 1) * pageSize;

        if (page < 1 || pageSize < 1 || pageSize > 100) {
            return res.status(400).json({
                message: 'Page number must be 1 or greater, pageSize must be greater than 0, and not exceed 100'
            });
        }

        const query = `SELECT id, firstname, lastname, citizen_id, pin, account_type, user_img_path 
                       FROM "user" 
                       WHERE account_role = $1 AND account_status = $2
                       ORDER BY id
                       LIMIT $3 OFFSET $4`;
        const values = ['user', '1', pageSize, offset];
        const result = await client.query(query, values);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error fetching users' });
    }
}


// Get user by ID
async function getUserById(req, res) {
    try {
        const userId = req.params.id;
        // Query to retrieve user details by ID
        const query = `SELECT id,firstname,lastname,citizen_id,pin,account_type,user_img_path FROM "user" WHERE id = $1`;
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
        const updateQuery = 'UPDATE "user" SET account_status = 0 WHERE id = $1';
        const result = await client.query(updateQuery, [userId]);
        const id = req.user.id;
        // console.log(userId)
        if (result.rowCount === 1) {
            logging("deactivate",id,"User deactivate successfully id: "+userId)
            res.status(200).json({ message: 'User deactivate successfully' });
        } else {
            logging("error deactivateUser", id, "User not found id: "+userId);
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        const id = req.user.id;
        logging("error deactivateUser", id, err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update user account
async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;
        const loggedInUserId = req.user.id;

        const { firstname, lastname, citizen_id, pin } = updatedUserData;

        const requiredFields = ['firstname', 'lastname', 'citizen_id', 'pin'];
        if (requiredFields.some(field => !updatedUserData[field])) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const pinRegex = /^\d{12}-\d$/;
        if (!pinRegex.test(pin) || isNaN(citizen_id)) {
            return res.status(400).json({ message: 'ID and Citizen ID must be numbers in correct format' });
        }

        const updateQuery = 'UPDATE "user" SET firstname = $1, lastname = $2, citizen_id = $3, pin = $4 WHERE id = $5';
        const result = await client.query(updateQuery, [firstname, lastname, citizen_id, pin, userId]);

        if (result.rowCount === 1) {
            logging("updateuser", loggedInUserId, `User data updated successfully. User ID: ${userId}`);
            res.status(200).json({ message: 'User data updated successfully' });
        } else {
            logging("error updateuser", loggedInUserId, `User not found. User ID: ${userId}`);
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        const loggedInUserId = req.user.id;
        logging("error updateuser", loggedInUserId, err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Search from pin,citizen_id
async function searchuser(req, res) {
    const search = req.body.search;
    try 
    {
     const Query = `SELECT id, firstname, lastname, citizen_id, pin, account_type, user_img_path
                    FROM "user"
                    WHERE pin LIKE '%' || $1 || '%' OR citizen_id LIKE '%' || $1 || '%'
                    `;
    const values = [search];   
    const result = await client.query(Query, values);
    console.log(result);
    res.status(200).json(result.rows); 
    } catch (err) 
    {
     console.error(err.message);
     res.status(500).json({ message: 'Internal server error' });
    }
}

// TODO: Upload img



module.exports = { adduser, getallusers, getUserById, deactivateUser, updateUser, searchuser };