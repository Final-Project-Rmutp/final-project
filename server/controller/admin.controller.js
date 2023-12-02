const client = require('../configs/database.js');
const jwt =  require('jsonwebtoken');
const { logging } = require('../middleware/loggingMiddleware.js');

// Add a new user
async function adduser(req, res) {
    const { pin, citizen_id, firstname, lastname, accounttype, use_img_path } = req.body;

    // Check for missing or empty values (except user_img_path)
    if(!pin || !citizen_id || !firstname || !lastname || !accounttype){
        return res.status(400).json({ message: 'All fields are required' });
    }
    const pinRegex = /^\d{12}-\d$/; // Regex to match "000000000000-0" format
    // Check if id and citizen_id are numbers
    if (!pinRegex.test(pin)  || isNaN(citizen_id)) {
        console.log(pin);
        return res.status(400).json({ message: 'ID and Citizen ID must be numbers' });
    }

        let insertQuery = `insert into "user" (pin, citizen_id, firstname, lastname, accounttype, user_img_path) 
                            VALUES ($1, $2, $3, $4, $5, $6)
                            RETURNING id`;
        const values = [pin, citizen_id, firstname, lastname, accounttype, use_img_path];
        
    try {

        // Check if the pin already exists in the database
        const pinCheckQuery = `SELECT id FROM "user" WHERE pin = $1`;
        const pinCheckResult = await client.query(pinCheckQuery, [pin]);

        if (pinCheckResult.rows.length > 0) {
            return res.status(400).json({ message: 'PIN already exists' });
        }

        const result = await client.query(insertQuery, values);
        const insertedId = result.rows[0].id;
        const id = req.user.id;

        logging("adduser", id,'User registration successful user_id: '+insertedId);
        res.status(201).json({ message: 'User registration successful'});
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
        const result = await client.query(`SELECT id,firstname,lastname,citizen_id,pin,user_img_path FROM "user" WHERE accountrole = 'user'`);
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
        const query = `SELECT id,firstname,lastname,citizen_id,pin,user_img_path FROM "user" WHERE id = $1 AND accountrole = 'user'`; // select แค่จำเป็น
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
        const updateQuery = 'UPDATE "user" SET accountstatus = 0 WHERE id = $1';
        const result = await client.query(updateQuery, [userId]);
        const id = req.user.id;
        // console.log(userId)
        if (result.rowCount === 1) {
            logging("deactivate",id,"User deactivate successfully id: "+userId)
            res.status(200).json({ message: 'User deactivate successfully' });
        } else {
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
        
        // Check if id and citizen_id are numbers
         if (isNaN(updatedUserData.pin) || isNaN(updatedUserData.citizen_id)) {
        return res.status(400).json({ message: 'ID and Citizen ID must be numbers' });
         }
        // Extract updated fields from the request body
        const { firstname, lastname, citizen_id, pin } = updatedUserData;
        // Update query to set accountstatus to 0 for the user with the specified ID
        const updateQuery = 'UPDATE "user" SET firstname = $1, lastname =$2 , citizen_id = $3, pin = $4  WHERE id = $5';
        const result = await client.query(updateQuery, [firstname, lastname, citizen_id, pin , userId]);
        if (result.rowCount === 1) {
            const id = req.user.id;
            logging("updateuser", id,"User data updated successfully id: "+userId)
            res.status(200).json({ message: 'User data updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        const id = req.user.id;
        logging("error updateuser", id, err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { adduser, getallusers, getUserById, deactivateUser, updateUser };