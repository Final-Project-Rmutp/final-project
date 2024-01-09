const client = require('../configs/database.js');

// Function to log events
function logging(action_type, user_id, action_status, log_status) {
    try {
        const insertQuery = `insert into action_logs (action_type_id,user_id,action_status,logs_message,timestamp) values ($1, $2, $3, $4, CURRENT_TIMESTAMP)`;
        const values = [action_type, user_id, action_status, log_status];
        client.query(insertQuery, values);
    } catch (err) {
      console.error('Error logging: ', err);
    }
  }

module.exports = { logging };