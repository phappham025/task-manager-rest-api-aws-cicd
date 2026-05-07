// src/app.js

// File này cấu hình Express app.
// Bao gồm middleware, routes, health check và error handling.

require("dotenv").config();

const express = require("express");
const taskRoutes = require("./routes/task.routes");
const { checkDatabaseConnection } = require("./config/db");

const app = express();

// Middleware giúp Express đọc JSON body từ request.
app.use(express.json());

// Health check cơ bản.
// Endpoint này chỉ kiểm tra app có chạy hay không.
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Task Manager API is running"
  });
});

// Health check database.
// Endpoint này kiểm tra app có kết nối được PostgreSQL hay không.
app.get("/health/db", async (req, res, next) => {
  try {
    const dbStatus = await checkDatabaseConnection();

    res.status(200).json({
      status: "ok",
      message: "Database connection is healthy",
      databaseTime: dbStatus.current_time
    });
  } catch (error) {
    next(error);
  }
});

// Gắn task routes vào prefix /tasks.
app.use("/tasks", taskRoutes);

// Xử lý route không tồn tại.
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

// Xử lý lỗi tổng quát.
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);

  res.status(500).json({
    error: "Internal server error"
  });
});

module.exports = app;