// src/routes/conversationRoutes.js
import express from "express";
import {
  getConversations,
  assignConversation,
  setFollowUp,
  getConversationById,
  closeConversation,
  startTyping,
  stopTyping,
} from "../controllers/conversationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

// list conversations 
router.get("/list-all-convos", protect, getConversations);

// get single conversation
router.get("convo/:id", protect, getConversationById);

// assign conversation -> adminOnly (admin or super admin)
router.put("/assign", protect, adminOnly, assignConversation);

// set follow-up -> allow both agent and admin
router.put("/followup", protect, setFollowUp);

// close conversation -> agent or admin can close 
router.put("/:id/close", protect, closeConversation);

router.post("/:conversationId/start-typing", protect, startTyping);

router.post("/:conversationId/stop-typing", protect, stopTyping);

export default router;
