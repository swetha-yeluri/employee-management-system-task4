const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT DB
const db = new sqlite3.Database("./employees.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to SQLite DB");
  }
});

// CREATE TABLE
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

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Backend Working");
});

// GET ALL EMPLOYEES
app.get("/employees", (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);
  });
});

// ADD EMPLOYEE
app.post("/employees", (req, res) => {
  const { name, role, email, department, status } =
    req.body;

  db.run(
    `INSERT INTO employees 
    (name, role, email, department, status)
    VALUES (?, ?, ?, ?, ?)`,
    [name, role, email, department, status],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Employee Added",
      });
    }
  );
});

// DELETE EMPLOYEE
app.delete("/employees/:id", (req, res) => {
  db.run(
    "DELETE FROM employees WHERE id=?",
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Employee Deleted",
      });
    }
  );
});

// UPDATE EMPLOYEE
app.put("/employees/:id", (req, res) => {
  const { name, role, email, department, status } =
    req.body;

  db.run(
    `UPDATE employees
     SET name=?, role=?, email=?, department=?, status=?
     WHERE id=?`,
    [
      name,
      role,
      email,
      department,
      status,
      req.params.id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Employee Updated",
      });
    }
  );
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});