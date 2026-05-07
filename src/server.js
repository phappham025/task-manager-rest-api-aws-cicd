// src/server.js

// File này có nhiệm vụ khởi động HTTP server.
// app.js định nghĩa API, còn server.js chạy API ở một port cụ thể.

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Task Manager API is running on http://localhost:${PORT}`);
});