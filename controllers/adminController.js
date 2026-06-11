const User = require("../models/User");
const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "User Deleted",
  });
};

exports.deleteAnyTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.json({
    message: "Task Deleted Successfully",
  });
};

exports.updateUserStatus = async (req, res) => {
  const { status } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(user);
};

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find().populate("createdBy", "name email");

  res.json(tasks);
};

exports.getLogs = async (req, res) => {
  const logs = await ActivityLog.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(logs);
};

exports.getAnalytics = async (req, res) => {
  const totalUsers = await User.countDocuments();

  const totalTasks = await Task.countDocuments();

  const completedTasks = await Task.countDocuments({
    status: "Completed",
  });

  const pendingTasks = await Task.countDocuments({
    status: "Pending",
  });

  res.json({
    totalUsers,
    totalTasks,
    completedTasks,
    pendingTasks,
  });
};
