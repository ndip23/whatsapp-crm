import express from "express";
import {
  getAgentPerformance,
  getDashboardStats,
  getMessagesByDay,
} from "../controllers/AnalyticsController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin", protect, adminOnly, getDashboardStats);
router.get("/agents", protect, adminOnly, getAgentPerformance);
router.get("/messages", protect, adminOnly, getMessagesByDay);

export default router;
