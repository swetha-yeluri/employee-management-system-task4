const sqlite3 = require("sqlite3").verbose();

// Create / connect DB file
const db = new sqlite3.Database("./employees.db", (err) => {
  if (err) {
    console.log("DB Error:", err.message);
  } else {
    console.log("Connected to SQLite DB");
  }
});

// Create table
db.run(`
CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  role TEXT,
  email TEXT,
  department TEXT,
  status TEXT
)
`);

module.exports = db;