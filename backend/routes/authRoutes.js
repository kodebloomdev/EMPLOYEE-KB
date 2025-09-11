import express from "express";
import { signin , credentialsSent } from "../controllers/authController.js";
import { employesAssigned } from "../controllers/authController.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/credentials/:id", credentialsSent);
router.get("/assignedEmployees", employesAssigned);
export default router;
