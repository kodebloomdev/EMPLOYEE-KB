import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, unique: true }, // 👈 added
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    
    role: {
      type: String,
      enum: ["employee", "project managers", "hr", "director"],
      default: "employee",
    },
    position: { type: String },
    department: { type: String },
    salary: { type: Number },
    assignedHr:{type: mongoose.Schema.Types.ObjectId, ref: 'User'} || null ,
    assignedPM:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}|| null ,
    mobile: { type: String },
    status: { type: String, enum: ["Active", "InActive"], default: "Active" },
    photo: { type: String },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
