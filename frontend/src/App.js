import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Employees: 8</p>
      <p>Total Departments: 5</p>
    </div>
  );
}

function Employees() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");

  const employees = [
    { id: 1, name: "John", role: "Developer", email: "john@gmail.com", dept: "IT", status: "Active" },
    { id: 2, name: "Sara", role: "Manager", email: "sara@gmail.com", dept: "HR", status: "Active" },
    { id: 3, name: "Ravi", role: "Tester", email: "ravi@gmail.com", dept: "IT", status: "Inactive" },
    { id: 4, name: "Anil", role: "Designer", email: "anil@gmail.com", dept: "Design", status: "Active" },
    { id: 5, name: "Priya", role: "HR Executive", email: "priya@gmail.com", dept: "HR", status: "Active" },
    { id: 6, name: "Kiran", role: "Developer", email: "kiran@gmail.com", dept: "IT", status: "Inactive" },
    { id: 7, name: "Divya", role: "Support", email: "divya@gmail.com", dept: "Support", status: "Active" },
    { id: 8, name: "Ramesh", role: "Admin", email: "ramesh@gmail.com", dept: "Admin", status: "Active" }
  ];

  const filtered = employees.filter((emp) => {
    const matchName = emp.name.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "" || emp.dept === dept;
    return matchName && matchDept;
  });

  return (
    <div>
      <h1>Employees</h1>

      {/* SEARCH */}
      <input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />

      {/* FILTER */}
      <select
        value={dept}
        onChange={(e) => setDept(e.target.value)}
        style={{ padding: "8px" }}
      >
        <option value="">All Departments</option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Design">Design</option>
        <option value="Support">Support</option>
        <option value="Admin">Admin</option>
      </select>

      {/* TABLE */}
      <table border="1" cellPadding="10" style={{ marginTop: "10px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.email}</td>
              <td>{emp.dept}</td>
              <td style={{ color: emp.status === "Active" ? "green" : "red" }}>
                {emp.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Departments = () => <h1>Departments Page</h1>;
const Attendance = () => <h1>Attendance Page</h1>;
const Settings = () => <h1>Settings Page</h1>;

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "app dark" : "app"}>

      <BrowserRouter>

        {/* SIDEBAR */}
        <div className="sidebar">
          <h2>EMS</h2>

          <Link to="/">Dashboard</Link>
          <Link to="/employees">Employees</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/settings">Settings</Link>

          <button onClick={() => setDark(!dark)} className="toggle">
            {dark ? "Light Mode ☀" : "Dark Mode 🌙"}
          </button>
        </div>

        {/* CONTENT */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>

      </BrowserRouter>

    </div>
  );
}