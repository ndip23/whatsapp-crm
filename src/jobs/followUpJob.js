import cron from "node-cron";
import Conversation from "../models/Conversation.js";
import { sendNotification } from "../services/notificationService.js";

/**
 * Every 10 minutes:
 *  1. Find conversations with a followUpAt time in the past and still open.
 *  2. Send notification to assigned agent (and maybe admin).
 */
export const startFollowUpJob = () => {
  cron.schedule("*/10 * * * *", async () => {
    console.log("Checking follow-ups…");
    const now = new Date();

    const dueConversations = await Conversation.find({
      followUpAt: { $lte: now },
      status: "open",
    }).populate("assignedAgent client");

    for (const convo of dueConversations) {
      if (convo.assignedAgent) {
        await sendNotification(
          convo.assignedAgent._id,
          "followup_due",
          `Follow-up due for ${convo.client.phoneNumber}`,
          { conversationId: convo._id }
        );
      }

      // mark followUpAt null or reschedule
      convo.followUpAt = null;
      await convo.save();
    }

    // Inactive > 24h
    const inactiveConversations = await Conversation.find({
    lastMessageAt: { $lte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    status: "open",
    }).populate("assignedAgent client");

    for (const convo of inactiveConversations) {
    if (convo.assignedAgent) {
        await sendNotification(
        convo.assignedAgent._id,
        "inactive_chat",
        `Conversation with ${convo.client.phoneNumber} has been inactive for 24 hours`,
        { conversationId: convo._id }
        );
    }
    }

  });
};
