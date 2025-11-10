import express from "express";
import { getUserNotifications, markAsRead } from "../controllers/NotificationsController.js";

const router = express.Router();

router.get("/", getUserNotifications);
router.put("/:id/read", markAsRead);

export default router;
