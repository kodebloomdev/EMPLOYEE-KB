import { Router } from "express";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesByHr
} from "../controllers/employeeController.js";

const router = Router();

router.get("/", getEmployees);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.get("/hr/:hrId", getEmployeesByHr);


export default router;
