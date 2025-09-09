import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// 📌 Get all notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({ to: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notifications", error: err });
  }
});

// 📌 Create a new notification
router.post("/", async (req, res) => {
  try {
    const { to, title, body, data } = req.body;

    const notification = new Notification({
      to,
      title,
      body,
      data
    });

    const saved = await notification.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error creating notification", error: err });
  }
});

// 📌 Mark one notification as read
router.put("/:id/read", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: "Error marking notification as read", error: err });
  }
});

// 📌 Mark all notifications as read for a user
router.put("/:userId/readAll", async (req, res) => {
  try {
    await Notification.updateMany(
      { to: req.params.userId, read: false },
      { $set: { read: true } }
    );
    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Error updating notifications", error: err });
  }
});

// 📌 Delete a notification
router.delete("/:id", async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting notification", error: err });
  }
});

export default router;
