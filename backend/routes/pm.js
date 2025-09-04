
import express from 'express';
import { auth, permit } from '../middleware/auth.js';
import Notification from '../models/Notification.js';
import Employee from '../models/Employee.js';

const router = express.Router();

// PM notifications
router.get('/notifications', auth, permit('PM'), async (req, res) => {
  const notifs = await Notification.find({ to: req.user.id }).sort({ createdAt: -1 });
  res.json(notifs);
});



// List employees assigned to this PM
router.get('/employees', auth, permit('PM'), async (req, res) => {
  const list = await Employee.find({ assignedManager: req.user.id }).sort({ createdAt: -1 });
  res.json(list);
});

export default router;
