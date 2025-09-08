// backend/controllers/employeeController.js
import Employee from "../models/Employee.js";

// ✅ GET /api/employees - fetch all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    console.error("getEmployees error:", error);
    res.status(500).json({ message: "Error fetching employees" });
  }
};

// ✅ POST /api/employees - create new employee
export const createEmployee = async (req, res) => {
  try {
    console.log("👉 Incoming employee payload:", req.body);

    const {
      employeeId,
      name,
      dob,
      email,
      role,
      position,
      department,
      salary,
      mobile,
      status,
      photo,
    } = req.body;

    if (!name || !dob || !email ) {
      return res
        .status(400)
        .json({ message: "name, dob, and email are required" });
    }

    const payload = {
      employeeId,
      name: name.trim(),
      dob: dob ? new Date(dob) : null,
      email: email.toLowerCase().trim(),
      
      role: role || "employee",
      position: position || "",
      department: department || "",
      salary: salary || 0,
      mobile: mobile || "",
      status: status || "Active",
      photo: photo || "",
    };

    console.log("👉 Normalized payload:", payload);

    const created = await Employee.create(payload);
    console.log("✅ Employee created:", created);

    res.status(201).json(created);
    
  } catch (error) {
    console.error("❌ createEmployee error:", error);
    if (error?.code === 11000 && error?.keyPattern?.email) {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: error.message || "Error creating employee" });
  }
};


// ✅ PUT /api/employees/:id - update employee
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const update = { ...req.body };

  

    // 🔹 Normalize
    if (update.email) update.email = update.email.toLowerCase().trim();
    if (update.name) update.name = update.name.trim();
    if (update.dob) update.dob = new Date(update.dob);

    const updated = await Employee.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Employee not found" });

    res.json(updated);
  } catch (error) {
    console.error("updateEmployee error:", error);

    if (error?.code === 11000 && error?.keyPattern?.email) {
      return res.status(409).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Error updating employee" });
  }
};

// ✅ DELETE /api/employees/:id - delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await Employee.findByIdAndDelete(id);

    if (!del) return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee deleted" });
  } catch (error) {
    console.error("deleteEmployee error:", error);
    res.status(500).json({ message: "Error deleting employee" });
  }
};
