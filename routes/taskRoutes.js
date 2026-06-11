const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const Task = require("../models/Task");
const logActivity = require("../utils/activityLogger");

router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      createdBy: req.user.id,
    });

    await logActivity(req.user.id, "TASK_CREATE", "Task Created");

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/my-tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      createdBy: req.user.id,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title = req.body.title || task.title;

    task.description = req.body.description || task.description;

    task.status = req.body.status || task.status;

    await task.save();

    await logActivity(req.user.id, "TASK_UPDATE", "Task Updated");

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await logActivity(req.user.id, "TASK_DELETE", "Task Deleted");

    res.json({
      message: "Task Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
