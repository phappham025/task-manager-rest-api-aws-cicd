// src/controllers/task.controller.js

// Controller có nhiệm vụ:
// 1. Nhận request từ route.
// 2. Validate input cơ bản.
// 3. Gọi service để xử lý logic/database.
// 4. Trả response cho client.

const taskService = require("../services/task.service");

// Chuyển id từ URL string sang number.
// Nếu id không hợp lệ thì trả về null.
function parseTaskId(id) {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return null;
  }

  return parsedId;
}

// GET /tasks
async function getAllTasks(req, res, next) {
  try {
    const tasks = await taskService.getAllTasks();

    res.status(200).json({
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
}

// GET /tasks/:id
async function getTaskById(req, res, next) {
  try {
    const taskId = parseTaskId(req.params.id);

    if (!taskId) {
      return res.status(400).json({
        error: "Invalid task id"
      });
    }

    const task = await taskService.getTaskById(taskId);

    if (!task) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.status(200).json({
      data: task
    });
  } catch (error) {
    next(error);
  }
}

// POST /tasks
async function createTask(req, res, next) {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        error: "Title is required and must be a non-empty string"
      });
    }

    const newTask = await taskService.createTask(title);

    res.status(201).json({
      message: "Task created successfully",
      data: newTask
    });
  } catch (error) {
    next(error);
  }
}

// PUT /tasks/:id
async function updateTask(req, res, next) {
  try {
    const taskId = parseTaskId(req.params.id);

    if (!taskId) {
      return res.status(400).json({
        error: "Invalid task id"
      });
    }

    const { title, completed } = req.body;

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
          error: "Title must be a non-empty string"
        });
      }
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({
          error: "Completed must be a boolean value"
        });
      }
    }

    const updatedTask = await taskService.updateTask(taskId, {
      title,
      completed
    });

    if (!updatedTask) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
}

// DELETE /tasks/:id
async function deleteTask(req, res, next) {
  try {
    const taskId = parseTaskId(req.params.id);

    if (!taskId) {
      return res.status(400).json({
        error: "Invalid task id"
      });
    }

    const deletedTask = await taskService.deleteTask(taskId);

    if (!deletedTask) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      data: deletedTask
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};