import Notification from "../models/Notification.js";
import { io } from "../app.js";

/**
 * Create and emit a notification
 * @param {ObjectId} userId
 * @param {String} type
 * @param {String} message
 * @param {Object} metadata
 */
export const sendNotification = async (userId, type, message, metadata = {}) => {
  try {
    
    // Save in DB
    const notif = await Notification.create({
      user: userId,
      type,
      message,
      metadata,
    });

    // Emit real-time
    io.to(userId.toString()).emit("notification", notif);

    return notif;
  } catch (err) {
    console.error("Notification error:", err.message);
  }
};
