import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createShift,
  getShifts,
  updateShift,
  assignShiftToAgent,
  updateAgentStatusByShift,
} from "../controllers/ShiftController.js";

const router = express.Router();

// CRUD for Shifts
router.post("/create-shift", protect, createShift);
router.get("/view-shifts", protect, getShifts);
router.put("/update/:id", protect, updateShift);

// Assign shift to agent
router.put("/assign/:agentId", protect, assignShiftToAgent);

// Manual trigger for active status
router.put("/update-status", protect, updateAgentStatusByShift);

export default router;
