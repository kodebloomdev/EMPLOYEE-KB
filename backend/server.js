import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

// your other route groups
import authRoutes from "./routes/authRoutes.js";
import directorRoutes from "./routes/director.js";
import hrRoutes from "./routes/hr.js";
import pmRoutes from "./routes/pm.js";

// employees routes
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();
await connectDB(); // ensure mongo is connected before listening

const app = express();

// ⚠️ allow big base64 photos (increase if needed)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// CORS (front-end on Vite default 5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/director", directorRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/pm", pmRoutes);

// 👇 This must match your frontend calls
app.use("/api/employees", employeeRoutes);

// error fallback so you can see errors clearly
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
