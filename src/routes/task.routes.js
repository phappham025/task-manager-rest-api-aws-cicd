// src/routes/task.routes.js

// File này chỉ định nghĩa endpoint API.
// Route không xử lý logic trực tiếp.
// Route gọi controller tương ứng.

const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");

// GET /tasks
// Lấy toàn bộ tasks từ PostgreSQL.
router.get("/", taskController.getAllTasks);

// GET /tasks/:id
// Lấy một task theo id.
router.get("/:id", taskController.getTaskById);

// POST /tasks
// Tạo task mới.
router.post("/", taskController.createTask);

// PUT /tasks/:id
// Cập nhật task theo id.
router.put("/:id", taskController.updateTask);

// DELETE /tasks/:id
// Xóa task theo id.
router.delete("/:id", taskController.deleteTask);

module.exports = router;