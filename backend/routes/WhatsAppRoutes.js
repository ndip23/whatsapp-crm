import express from "express";
import { verifyWebhook, handleIncomingMessage } from "../controllers/WhatsAppController.js";
import { sendMessageController } from "../controllers/SendMessageController.js";

const router = express.Router();

router.get("/verify/webhook", verifyWebhook);
router.post("/webhook/incoming-msg", handleIncomingMessage);

// Agent sending message
router.post("/send", sendMessageController);

export default router;
