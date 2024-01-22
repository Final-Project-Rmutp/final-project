const client = require("../configs/database.js");
const jwt = require("jsonwebtoken");
const { logging } = require("../middleware/loggingMiddleware.js");
const fs = require("fs");
const { deleteObjectFromS3 } = require("../middleware/uploadMiddleware.js");

// Add a new user
async function adduser(req, res) {
  const { pin, citizen_id, firstname, lastname, account_type } = req.body;
  const action_type = 5; // adduser

  // Check for missing or empty values
  const requiredFields = [pin, citizen_id, firstname, lastname, account_type];
  if (requiredFields.some((field) => !field)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const pinRegex = /^\d{12}-\d$/; // Regex to match "000000000000-0" format
  if (!pinRegex.test(pin) || isNaN(citizen_id)) {
    return res.status(400).json({
      message: "ID and Citizen ID must be numbers in the correct format",
    });
  }

  try {
    const pinCheckQuery = `SELECT id FROM "user" WHERE pin = $1`;
    const pinCheckResult = await client.query(pinCheckQuery, [pin]);

    if (pinCheckResult.rows.length > 0) {
      return res.status(400).json({ message: "PIN already exists" });
    }

    const insertQuery = `INSERT INTO "user" (pin, citizen_id, firstname, lastname, account_type, user_img_path) 
                            VALUES ($1, $2, $3, $4, $5, $6)
                            RETURNING id`;
    const values = [pin, citizen_id, firstname, lastname, account_type, req.uploadedFileUrl];
    const result = await client.query(insertQuery, values);
    const insertedId = result.rows[0].id;
    const id = req.user.id;

    logging(action_type, id, "Success", `User registration successful. User ID: ${insertedId}`);
    res.status(201).json({ message: "User registration successful" });
  } catch (err) {
    const id = req.user.id;
    console.error(err.message);
    logging(action_type, id, "Error", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get all users
async function getallusers(req, res) {
  const accountstatus = 1; //1 = active user
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return res.status(400).json({
        message:
          "Page number must be 1 or greater, pageSize must be greater than 0, and not exceed 100",
      });
    }

    const query = `SELECT id, firstname, lastname, citizen_id, pin, account_type, user_img_path 
                       FROM "user" 
                       WHERE account_role = $1 AND account_status = $2
                       ORDER BY id
                       LIMIT $3 OFFSET $4`;
    const values = ["user", accountstatus , pageSize, offset];
    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching users" });
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
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update user account status to 0
async function deactivateUser(req, res) {
  const action_type = 6; //deactivateUser
  try {
    const userId = req.params.id;
    // Update query to set accountstatus to 0 for the user with the specified ID
    const updateQuery = 'UPDATE "user" SET account_status = 0 WHERE id = $1';
    const result = await client.query(updateQuery, [userId]);
    const id = req.user.id;
    // console.log(userId)
    if (result.rowCount === 1) {
      logging(action_type,id,"Success",`User deactivate successfully id: ${userId}`);
      res.status(200).json({ message: "User deactivate successfully" });
    } else {
      logging(action_type, id, "Error", `User not found id: ${userId}`);
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    const id = req.user.id;
    logging(action_type, id, "Error", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update user account using S3 for image storage
async function updateUser(req, res) {
  const action_type = 7; // updateUser
  try {
    const userId = req.params.id;
    const { firstname, lastname, citizen_id, pin } = req.body;
    const user_img_path = req.file ? req.file.filename : null; // New image if provided
    const id = req.user.id;

    const requiredFields = ["firstname", "lastname", "citizen_id", "pin"];
    if (requiredFields.some((field) => !req.body[field])) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const pinRegex = /^\d{12}-\d$/;
    if (!pinRegex.test(pin) || isNaN(citizen_id)) {
      return res.status(400).json({
        message: "ID and Citizen ID must be numbers in the correct format",
      });
    }

    const oldUserData = await client.query('SELECT user_img_path FROM "user" WHERE id = $1', [userId]);
    // Update the user data in the database
    const updateQuery =
    'UPDATE "user" SET firstname = $1, lastname = $2, citizen_id = $3, pin = $4, user_img_path = $5 WHERE id = $6';
    const result = await client.query(updateQuery, [firstname, lastname, citizen_id, pin, req.uploadedFileUrl, userId]);

    if (oldUserData.rows && oldUserData.rows.length > 0) {
      const oldImageFileName = oldUserData.rows[0].user_img_path;
      
      // Delete old image file from S3 if a new image is uploaded or if the image is removed
      if (oldImageFileName && (user_img_path !== null || user_img_path === null)) {
        await deleteObjectFromS3(oldImageFileName);
      }

      logging(action_type, id, "Success", `User data updated successfully. User ID: ${userId}`);
      res.status(200).json({ message: "User data updated successfully" });
    } else {
      logging(action_type, id, "Error", `User not found. User ID: ${userId}`);
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    const id = req.user.id;
    logging(action_type, id, "Error", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Search from pin,citizen_id
async function searchuser(req, res) {
  const search = req.body.search;
  const activeaccount = 1; // active account = 1 // inactive account = 2
  try {
    const Query = `SELECT id, firstname, lastname, citizen_id, pin, account_type, user_img_path
                    FROM "user"
                    WHERE account_status = $2 AND (pin LIKE '%' || $1 || '%' OR citizen_id LIKE '%' || $1 || '%' OR firstname LIKE '%' || $1 || '%' OR lastname LIKE '%' || $1 || '%')
                    `;
    const values = [search, activeaccount];
    const result = await client.query(Query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { adduser, getallusers, getUserById, deactivateUser, updateUser, searchuser };
