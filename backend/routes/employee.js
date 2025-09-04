
import express from 'express';
import { auth, permit } from '../middleware/auth.js';
import User from '../models/User.js';
import Employee from '../models/Employee.js';

const router = express.Router();

router.get('/me', auth, permit('EMPLOYEE'), async (req, res) => {
  const user = await User.findById(req.user.id).populate('employee');
  if (!user || !user.employee) return res.status(404).json({ message: 'Profile not found' });
  const emp = await Employee.findById(user.employee._id).populate('assignedManager assignedHR');
  res.json(emp);
});

export default router;
