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

// Read RoomSchedule
async function getschedule(req, res) {
    try {
        const reservationsQuery = `
            SELECT
                c.class_id AS reservation_id,
                s.subject_name,
                CONCAT(u.firstname, ' ', u.lastname) AS fullname,
                r.room_number,
                c.day_of_week,
                c.start_time,
                c.end_time
            FROM class c
            LEFT JOIN rooms r ON c.room_id = r.room_id
            LEFT JOIN subjects s ON c.subject_id = s.subject_id
            LEFT JOIN "user" u ON s.user_id = u.id
            WHERE u.id = $1;
        `;
        
        const userId = req.user.id
        const reservationsResult = await client.query(reservationsQuery, [userId]);


        res.status(200).json(reservationsResult.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

  // Get all report
async function getreservation(req, res) {
    try {
      const query = `SELECT
        CONCAT(u.firstname, ' ', u.lastname) AS fullname,
        u.account_type,
        r.room_number,
        rs.reservation_reason,
        rs.reservation_status,
        rs.reservation_date,
        rs.timestamp,
        rs.start_time,
        rs.end_time
        FROM reservations rs
        LEFT JOIN "user" u ON rs.user_id = u.id
        LEFT JOIN rooms r ON rs.room_id = r.room_id
        WHERE u.id = $1
        ORDER BY timestamp`;
      const userId = req.user.id
      const result = await client.query(query, [userId]);
      const transformedRows = result.rows.map(row => ({
        ...row,
        reservation_status: transformReservationStatus(row.reservation_status),
      }));
      res.status(200).json(transformedRows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Error fetching reports" });
    }
}

    // Function to transform reservation_status values
function transformReservationStatus(status) {
    switch (status) {
      case 0:
        return 'Cancel';
      case 1:
        return 'In progress';
      case 2:
        return 'Approve';
      default:
        return 'unknown';
    }
  }


module.exports = { getprofile, getschedule, getreservation };
