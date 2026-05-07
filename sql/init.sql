-- sql/init.sql

-- Tạo bảng tasks nếu bảng này chưa tồn tại.
-- Bảng này sẽ lưu dữ liệu task thật trong PostgreSQL.

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

-- Thêm dữ liệu mẫu.
-- ON CONFLICT không dùng ở đây vì id tự tăng bằng SERIAL.
-- Nếu không muốn có dữ liệu mẫu, có thể xóa phần INSERT này.

INSERT INTO tasks (title, completed)
VALUES
  ('Learn PostgreSQL', false),
  ('Build REST API with Express', false);