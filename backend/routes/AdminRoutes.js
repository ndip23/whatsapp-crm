import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createAgent, removeAgent, updateAgent, viewAgents, getRoles, getPermissions } from '../controllers/AdminController.js';
import { adminOnly } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post("/create-agent", protect, adminOnly, createAgent);
router.get("/view-agents", protect, adminOnly, viewAgents);
router.put("/update-agent/:id", protect, adminOnly, updateAgent);
router.delete("/delete-agent/:id", protect, adminOnly, removeAgent);
router.get("/roles", protect, adminOnly, getRoles);
router.get("/permissions", protect, adminOnly, getPermissions);


export default router;
