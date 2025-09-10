import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import directorRoutes from "./routes/director.js";
import hrRoutes from "./routes/hr.js";
import pmRoutes from "./routes/pm.js";
import employeeRoutes from "./routes/employeeRoutes.js";

// Models
import Notification from "./models/Notification.js";

dotenv.config();
await connectDB(); // ensure MongoDB connection before starting server

const app = express();

// ⚠️ Support big JSON payloads (for base64 images)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// ✅ Routes
 app.use("/api/auth", authRoutes);
app.use("/api/director", directorRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/pm", pmRoutes);
app.use("/api/employees", employeeRoutes);

// ✅ Create Notification
app.post("/api/notifications", async (req, res) => {
  console.log("POST /api/notifications hit", req.body);
  try {
    const { to, title, body, data } = req.body;

    const notification = new Notification({ to, title, body, data });
    await notification.save();

    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Fetch all notifications
app.get("/api/fetchnotifications", async (_req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Fetch employee details from notifications.data
app.get("/api/fetchEmployees", async (_req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    const employees = notifications.map((n) => ({
      id: n._id,        // notification id as unique identifier
      ...n.data,        // employee info stored in data
      title: n.title,
      body: n.body,
      createdAt: n.createdAt,
    }));

    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Test route
app.get("/test", (_req, res) => res.send("API is working"));

// ❌ Global error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
