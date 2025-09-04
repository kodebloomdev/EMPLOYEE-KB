
import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date },
  contactNumber: { type: String },
  email: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  designation: { 
    type: String,
    enum: ['Trainee Engineer','Junior Engineer','Engineer','Senior Engineer','Lead Engineer','Assistant Engineer','Manager'],
    required: true
  },
  assignedManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // PM
  assignedHR: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // HR
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // link when HR creates credentials
}, { timestamps: true });

export default mongoose.model('Employee', EmployeeSchema);
