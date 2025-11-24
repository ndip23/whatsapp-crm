import express from "express";
import { verifyWebhook, handleIncomingMessage } from "../controllers/WhatsAppController.js";
import { sendMessageController } from "../controllers/SendMessageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Webhook endpoints (no auth required - WhatsApp calls these)
router.get("/verify/webhook", verifyWebhook);
router.post("/webhook/incoming-msg", handleIncomingMessage);

// Agent sending message (requires authentication)
router.post("/send", protect, sendMessageController);

export default router;
