// src/services/task.service.js

// Service có nhiệm vụ xử lý business logic và truy vấn database.
// Ở phiên bản này, dữ liệu không còn lưu trong RAM nữa.
// Tất cả tasks được lưu thật trong PostgreSQL.

const db = require("../config/db");

// Lấy tất cả tasks từ PostgreSQL.
async function getAllTasks() {
  const result = await db.query(
    `
    SELECT
      id,
      title,
      completed,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM tasks
    ORDER BY id ASC;
    `
  );

  return result.rows;
}

// Lấy một task theo id.
async function getTaskById(id) {
  const result = await db.query(
    `
    SELECT
      id,
      title,
      completed,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM tasks
    WHERE id = $1;
    `,
    [id]
  );

  return result.rows[0] || null;
}

// Tạo task mới.
async function createTask(title) {
  const result = await db.query(
    `
    INSERT INTO tasks (title, completed)
    VALUES ($1, false)
    RETURNING
      id,
      title,
      completed,
      created_at AS "createdAt",
      updated_at AS "updatedAt";
    `,
    [title.trim()]
  );

  return result.rows[0];
}

// Cập nhật task theo id.
async function updateTask(id, updates) {
  // Trước tiên kiểm tra task có tồn tại không.
  const currentTask = await getTaskById(id);

  if (!currentTask) {
    return null;
  }

  // Nếu client không gửi title/completed thì giữ giá trị cũ.
  const newTitle =
    updates.title !== undefined ? updates.title.trim() : currentTask.title;

  const newCompleted =
    updates.completed !== undefined
      ? updates.completed
      : currentTask.completed;

  const result = await db.query(
    `
    UPDATE tasks
    SET
      title = $1,
      completed = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING
      id,
      title,
      completed,
      created_at AS "createdAt",
      updated_at AS "updatedAt";
    `,
    [newTitle, newCompleted, id]
  );

  return result.rows[0];
}

// Xóa task theo id.
async function deleteTask(id) {
  const result = await db.query(
    `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING
      id,
      title,
      completed,
      created_at AS "createdAt",
      updated_at AS "updatedAt";
    `,
    [id]
  );

  return result.rows[0] || null;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};