const client = require('../configs/database.js');
const { logging } = require('../middleware/loggingMiddleware.js');

// report room
async function ReportRoom(req, res) {
    const action_type = 8; // report room
    const { room_id, report_detail } = req.body;
    const userId = req.user.id;

    const missingFields = !room_id || !report_detail;
    if (missingFields) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const insertQuery = `INSERT INTO "reports" (room_id, user_id, report_detail, timestamp) 
                                VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
                                RETURNING report_id`;
        const values = [ room_id, userId, report_detail ];
    
        const result = await client.query(insertQuery, values);
        const insertedId = result.rows[0].report_id;
        const id = req.user.id;

        logging(action_type,id,"Success",`Reported successful. Report ID: ${insertedId}`);
        res.status(201).json({ message: "Reported successful" });
      } catch (err) {
        const id = req.user.id;
        console.error(err.message);
        logging(action_type, id, "Error", err.message);
        res.status(500).json({ message: "Internal server error" });
      }
}

// Get all report
async function getallreports(req, res) {
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
  
      const query = `SELECT 
                          reports.report_id,
                          rooms.room_number,
                          "user".firstname || ' ' || "user".lastname AS fullname,
                          reports.report_detail,
                          reports.report_status,
                          reports.timestamp
                      FROM 
                          reports
                          LEFT JOIN 
                          "user" ON reports.user_id = "user".id
                      LEFT JOIN
                          rooms ON reports.room_id = rooms.room_id                      
                      ORDER BY 
                          reports.report_id
                      LIMIT $1 OFFSET $2;
                      `;
      const values = [pageSize,offset];
      const result = await client.query(query, values);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Error fetching reports" });
    }
  }

  // Update report status
async function updatereportstatus(req, res) {
    const { report_status } = req.body;
    const action_type = 9; //updatereportstatus

    const missingFields = !report_status;
    if (missingFields) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const reportID = req.params.report_id;
      // Update query to set accountstatus to 0 for the user with the specified ID
      const updateQuery = 'UPDATE "reports" SET report_status = $1 WHERE report_id = $2';
      const values = [report_status,reportID]
      const result = await client.query(updateQuery,values);
      const id = req.user.id;
      // console.log(userId)
      if (result.rowCount === 1) {
        logging(action_type,id,"Success",`updated successfully id: ${reportID}`);
        res.status(200).json({ message: "updated successfully" });
      }
    } catch (err) {
      console.error(err.message);
      const id = req.user.id;
      logging(action_type, id, "Error", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }

// Get report
async function getreport(req, res) {
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

      const userId = req.user.id;
      const query = `
          SELECT reports.report_id,
                 rooms.room_number,
                 reports.report_detail,
                 CASE
                     WHEN reports.report_status = 0 THEN 'Canceled'
                     WHEN reports.report_status = 1 THEN 'In progress'
                     WHEN reports.report_status = 2 THEN 'Approve'
                 END AS report_status,
                 reports.timestamp
          FROM reports
          JOIN rooms ON reports.room_id = rooms.room_id
          WHERE reports.user_id = $1
          LIMIT $2 OFFSET $3;
      `;
      const values = [userId, pageSize, offset];
      const result = await client.query(query, values);
      const report = result.rows[0];

      if (!report) {
          return res.status(404).json({ message: 'Report not found' });
      }

      res.status(200).json(report);

  } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Error fetching profile data' });
  }
}


module.exports = { ReportRoom, getallreports, updatereportstatus, getreport};
