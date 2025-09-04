import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import directorRoutes from "./routes/director.js";
import hrRoutes from "./routes/hr.js";
import pmRoutes from "./routes/pm.js";
import employeeRoutes from "./routes/employee.js";
dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/director', directorRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/pm', pmRoutes);
app.use('/api/employee', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
