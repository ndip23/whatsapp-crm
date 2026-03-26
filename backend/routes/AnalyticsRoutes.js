import express from "express";
import {
  getAgentPerformance,
  getDashboardStats,
  getMessagesByDay,
} from "../controllers/AnalyticsController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/admin", protect,  getDashboardStats);
router.get("/agents", protect, adminOnly, getAgentPerformance);
router.get("/messages", protect,  getMessagesByDay);

export default router;
