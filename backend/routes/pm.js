import express from "express";
import { auth, permit } from "../middleware/auth.js";
import Notification from "../models/Notification.js";
import Employee from "../models/Employee.js";

const router = express.Router();

// 📌 Get PM notifications
router.get("/notifications", auth, permit("PM"), async (req, res) => {
  try {
    const notifs = await Notification.find({ to: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    res.json(Array.isArray(notifs) ? notifs : []);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// 📌 List employees assigned to this PM
router.get("/employees", auth, permit("PM"), async (req, res) => {
  try {
    const list = await Employee.find({ assignedManager: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    res.json(Array.isArray(list) ? list : []);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

export default router;
