import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);

  // FORM STATE
  const [form, setForm] = useState({
    id: null,
    name: "",
    role: "",
    email: "",
    department: "",
    status: "Active",
  });

  // FETCH EMPLOYEES
  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:5000/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ADD EMPLOYEE
  const addEmployee = async () => {
    await axios.post("http://localhost:5000/employees", form);

    setForm({
      id: null,
      name: "",
      role: "",
      email: "",
      department: "",
      status: "Active",
    });

    fetchEmployees();
  };

  // DELETE EMPLOYEE
  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:5000/employees/${id}`);
    fetchEmployees();
  };

  // EDIT EMPLOYEE
  const editEmployee = (emp) => {
    setForm(emp);
  };

  // UPDATE EMPLOYEE (FIXED)
  const updateEmployee = async () => {
    await axios.put(
      `http://localhost:5000/employees/${form.id}`,
      form
    );

    setForm({
      id: null,
      name: "",
      role: "",
      email: "",
      department: "",
      status: "Active",
    });

    fetchEmployees();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>EMS Dashboard</h1>

      <h3>Add / Edit Employee</h3>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <br />
      <br />

      {/* BUTTON SWITCH */}
      {form.id ? (
        <button onClick={updateEmployee}>
          Update Employee
        </button>
      ) : (
        <button onClick={addEmployee}>
          Add Employee
        </button>
      )}

      {/* TABLE */}
      <table
        border="1"
        cellPadding="10"
        style={{ marginTop: "20px", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp.id}>
              <td>{index + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.status}</td>

              <td>
                <button onClick={() => editEmployee(emp)}>
                  Edit
                </button>

                <button
                  onClick={() => deleteEmployee(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;