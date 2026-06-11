const ActivityLog = require("../models/ActivityLog");

const logActivity = async (userId, action, description) => {
  await ActivityLog.create({
    user: userId,
    action,
    description,
  });
};

module.exports = logActivity;
