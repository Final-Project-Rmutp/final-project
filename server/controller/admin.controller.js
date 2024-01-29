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

// Add a new Subject
async function addsubject(req, res) {
  const { subject_name, subject_code, user_id } = req.body;
  const action_type = 10; // addsubject

  // Check for missing or empty values
  const requiredFields = [subject_name, subject_code, user_id];
  if (requiredFields.some((field) => !field)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if subject with the same subject_code already exists
    const subjectCheckQuery = `SELECT subject_id FROM subjects WHERE subject_code = $1`;
    const subjectCheckResult = await client.query(subjectCheckQuery, [subject_code]);

    if (subjectCheckResult.rows.length > 0) {
      return res.status(400).json({ message: "Subject with the same code already exists" });
    }

    // Insert the new subject
    const insertQuery = `INSERT INTO subjects (subject_name, subject_code, user_id) 
                            VALUES ($1, $2, $3)
                            RETURNING subject_id`;
    const values = [subject_name, subject_code, user_id];
    const result = await client.query(insertQuery, values);
    const insertedId = result.rows[0].subject_id;
    const id = req.user.id;

    logging(action_type, id, "Success", `Add subject successful. Subject ID: ${insertedId}`);
    res.status(201).json({ message: "Add subject successful" });
  } catch (err) {
    const id = req.user.id;
    console.error(err.message);
    logging(action_type, id, "Error", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get all subjects
async function getallsubject(req, res) {
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

    const query = `
                  SELECT s.subject_id, s.subject_name, s.subject_code, u.firstname
                  FROM subjects s
                  LEFT JOIN "user" u ON s.user_id = u.id
                  ORDER BY s.subject_id
                  LIMIT $1 OFFSET $2`;

    const values = [pageSize, offset];
    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching subjects" });
  }
}

// Get subject by subject_id
async function getSubjectById(req, res) {
  try {
    const subjectId = req.params.subject_id;
    console.log(subjectId);
    const query = `
      SELECT subject_id, subject_name, subject_code, user_id
      FROM subjects
      WHERE subject_id = $1`;
      
    const result = await client.query(query, [subjectId]);

    if (result.rows.length === 1) {
      const subject = result.rows[0];
      res.status(200).json(subject);
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete subject by subject_id
async function deleteSubjectById(req, res) {
  try {
    const subjectId = req.params.subject_id;
    const query = `
      DELETE FROM subjects
      WHERE subject_id = $1`;

    const result = await client.query(query, [subjectId]);

    if (result.rowCount === 1) {
      res.status(200).json({ message: "Subject deleted successfully" });
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update subject data
async function updateSubject(req, res) {
  const action_type = 3; // update subject
  const subjectId = req.params.subject_id;
  const { subject_name, subject_code, user_id, subject_id } = req.body;

  const missingFields = !subject_name || !subject_code || !user_id || !subject_id;
  if (missingFields) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const areNumbersInvalid = isNaN(subjectId) || isNaN(user_id) || isNaN(subject_id);
  if (areNumbersInvalid) {
    return res.status(400).json({ message: 'Subject ID, User ID, and Edited Subject ID must be numbers' });
  }

  try {
    // Start a transaction for updating subject
    await client.query('BEGIN');

    const updateSubjectQuery = `
        UPDATE subjects 
        SET subject_name = $1, subject_code = $2, user_id = $3
        WHERE subject_id = $4
    `;

    const subjectValues = [subject_name, subject_code, user_id, subject_id];
    await client.query(updateSubjectQuery, subjectValues);

    await client.query('COMMIT');

    const userId = req.user.id;
    logging(action_type, userId, 'Success', `Subject update successful, subject_id: ${subject_id}`);
    res.status(200).json({ message: 'Subject update successful' });
  } catch (err) {
    await client.query('ROLLBACK');

    const userId = req.user.id;
    console.error(err.message);
    logging(action_type, userId, 'Error', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Add a new facility
async function addfacility(req, res) {
  const { facility_id, facility_name } = req.body;
  const action_type = 12; // addfacility

  const requiredFields = [facility_name, facility_id];
  if (requiredFields.some((field) => !field)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const facilityCheckQuery = `SELECT facility_id FROM facility WHERE facility_id = $1`;
    const facilityCheckResult = await client.query(facilityCheckQuery, [facility_id]);

    if (facilityCheckResult.rows.length > 0) {
      return res.status(400).json({ message: "Facility with the same ID already exists" });
    }

    const insertQuery = `INSERT INTO facility (facility_name, facility_id) 
                            VALUES ($1, $2)
                            RETURNING facility_id`;
    const values = [facility_name, facility_id];
    const result = await client.query(insertQuery, values);
    const insertedId = result.rows[0].facility_id;

    logging(action_type, req.user.id, "Success", `Add facility successful. Facility ID: ${insertedId}`);
    res.status(201).json({ message: "Add facility successful" });
  } catch (err) {
    console.error(err.message);
    logging(action_type, req.user.id, "Error", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get all facility
async function getallfacility(req, res) {
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

    const query = `
                  SELECT facility_id, facility_name
                  FROM facility
                  ORDER BY facility_id
                  LIMIT $1 OFFSET $2`;

    const values = [pageSize, offset];
    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching facility" });
  }
}

// Get facility by id
async function getFacilityById(req, res) {
  try {
    const facilityId = req.params.facility_id;
    console.log(facilityId);
    const query = `
      SELECT facility_id, facility_name
      FROM facility
      WHERE facility_id = $1`;
      
    const result = await client.query(query, [facilityId]);

    if (result.rows.length === 1) {
      const facility = result.rows[0];
      res.status(200).json(facility);
    } else {
      res.status(404).json({ message: "Facility not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete facility by facility_id
async function deleteFacilityById(req, res) {
  try {
    const facilityId = req.params.facility_id;
    const query = `
      DELETE FROM facility
      WHERE facility_id = $1`;

    const result = await client.query(query, [facilityId]);

    if (result.rowCount === 1) {
      res.status(200).json({ message: "Facility deleted successfully" });
    } else {
      res.status(404).json({ message: "Facility not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update facility data
async function updateFacility(req, res) {
  const action_type = 3; // update facility
  const facilityId = req.params.facility_id;
  const { facility_name } = req.body;

  const missingFields = !facility_name;
  if (missingFields) {
    return res.status(400).json({ message: 'Facility name is required' });
  }

  const isNumberInvalid = isNaN(facilityId);
  if (isNumberInvalid) {
    return res.status(400).json({ message: 'Facility ID must be a number' });
  }

  try {
    // Start a transaction for updating facility
    await client.query('BEGIN');

    const updateFacilityQuery = `
        UPDATE facility 
        SET facility_name = $1
        WHERE facility_id = $2
    `;

    const facilityValues = [facility_name, facilityId];
    await client.query(updateFacilityQuery, facilityValues);

    await client.query('COMMIT');

    const userId = req.user.id;
    logging(action_type, userId, 'Success', `Facility update successful, facility_id: ${facilityId}`);
    res.status(200).json({ message: 'Facility update successful' });
  } catch (err) {
    await client.query('ROLLBACK');

    const userId = req.user.id;
    console.error(err.message);
    logging(action_type, userId, 'Error', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Get room type
async function getteacherid(req, res) {
  try {
      const query = `
        SELECT id, firstname 
        FROM "user"
        WHERE account_type = 'teacher'
      `;
      const result = await client.query(query);

      const Data = result.rows;
  
      res.status(200).json(Data);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = { adduser, getallusers, getUserById, deactivateUser, updateUser, searchuser ,addsubject,
                 getallsubject ,getSubjectById , deleteSubjectById, updateSubject, addfacility, getallfacility,
                getFacilityById, deleteFacilityById, updateFacility, getteacherid };
