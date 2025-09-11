import User from "../models/User.js";
import Employee from "../models/Employee.js";

import bcrypt from "bcryptjs";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("SIGNIN REQUEST:", email);

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let isMatch = false;

    // Case 1: If password looks like bcrypt hash in DB → compare with bcrypt
    if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$")) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Case 2: Stored as plain text → just compare directly
      isMatch = user.password === password;
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Login success
    res.json({
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    });

  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ Save credentials without bcrypt
export const credentialsSent = async (req, res) => {
  try {
    const { id } = req.params; // employeeId from URL
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ employeeId: id });
    if (existingUser) {
      return res.status(400).json({ message: "Credentials already created for this employee" });
    }

    // Get employee doc
    const employeeDoc = await Employee.findOne({ employeeId: id });
    if (!employeeDoc) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Save user with plain text password ❌ (testing only)
    const user = await User.create({
      employeeId: id,
      name: employeeDoc.name,
      email,
      password, // plain text
      role: "Employee",
      employee: employeeDoc._id,
    });

    res.status(201).json({ message: "Credentials created", user });
  } catch (error) {
    console.error("Error creating credentials:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const employesAssigned = async (req, res) => {
  try {
    const employees = await User.find({ role: 'Employee' }).populate('employee')  ;
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error" });
  }
};
