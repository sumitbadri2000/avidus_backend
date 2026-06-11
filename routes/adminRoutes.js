const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  getAllUsers,
  deleteUser,
  updateUserStatus,
  getAllTasks,
  deleteAnyTask,
  getLogs,
  getAnalytics,
} = require("../controllers/adminController");

router.get("/users", auth, admin, getAllUsers);

router.delete("/users/:id", auth, admin, deleteUser);

router.patch("/users/:id/status", auth, admin, updateUserStatus);

router.get("/tasks", auth, admin, getAllTasks);

router.get("/logs", auth, admin, getLogs);

router.get("/analytics", auth, admin, getAnalytics);

router.delete("/tasks/:id", auth, admin, deleteAnyTask);

module.exports = router;
