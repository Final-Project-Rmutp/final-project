const client = require('../configs/database.js');
// Function to log events
function logging(action_type, user_id, log_status) {
    try {
        const insertQuery = `insert into action_logs (action_type,user_id,log_status,timestamp) values ($1, $2, $3,CURRENT_TIMESTAMP)`;
        const values = [action_type, user_id, log_status];
        client.query(insertQuery, values);
    } catch (err) {
      console.error('Error logging login:', err);
    }
  }

module.exports = { logging };