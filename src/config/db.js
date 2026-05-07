// src/config/db.js

// File này quản lý kết nối tới PostgreSQL.
// Toàn bộ service sẽ dùng file này để query database.

require("dotenv").config();

const { Pool } = require("pg");

// Kiểm tra có bật SSL cho database hay không.
// Local PostgreSQL thường dùng DB_SSL=false.
// AWS RDS có thể dùng DB_SSL=true tùy cấu hình.
const sslEnabled = process.env.DB_SSL === "true";

// Tạo connection pool.
// Pool giúp app tái sử dụng kết nối database thay vì mở kết nối mới cho mỗi request.
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "task_manager",
  user: process.env.DB_USER || "task_user",
  password: process.env.DB_PASSWORD || "task_password",
  ssl: sslEnabled ? { rejectUnauthorized: false } : false
});

// Bắt lỗi bất ngờ từ PostgreSQL connection pool.
pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error:", err);
});

// Hàm query dùng chung.
// Các service sẽ gọi hàm này thay vì gọi pool.query trực tiếp.
async function query(text, params) {
  return pool.query(text, params);
}

// Hàm kiểm tra database có kết nối được không.
// Dùng cho health check.
async function checkDatabaseConnection() {
  const result = await pool.query("SELECT NOW() AS current_time");
  return result.rows[0];
}

module.exports = {
  query,
  checkDatabaseConnection
};