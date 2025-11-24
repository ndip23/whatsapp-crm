import Client from "../models/Client.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { emitNewMessage } from "../socket/socketManager.js";
import { sendNotification } from "../services/notificationService.js";
import { receiveWhatsAppMessage, verifyWhatsAppWebhook } from "../services/whatsAppService.js";
import AgentProfile from "../models/AgentProfile.js";


// Webhook verification handler (Meta setup)

export const verifyWebhook = async (req, res) => {
  try {
    return verifyWhatsAppWebhook(req, res);
  } catch (error) {
    console.error("Webhook verification failed:", error.message);
    res.sendStatus(500);
  }
};



 // Handle incoming messages
 export const handleIncomingMessage = async (req, res) => {
  try {
    // Extract incoming message in a provider-agnostic way
    const { from, message: text } = await receiveWhatsAppMessage(req.body);
    if (!from || !text) return res.sendStatus(200);

    // Find or create client
    let client = await Client.findOne({ phoneNumber: from });
    if (!client) {
      client = await Client.create({
        phoneNumber: from,
        name: "Unknown",
      });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      client: client._id,
      status: { $in: ["open", "unassigned"] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        client: client._id,
        status: "unassigned",
        lastMessage: text,
        lastMessageAt: new Date(),
      });
    }

    // Update response time if agent replied last
    if (conversation.assignedAgent) {
      const lastAgentMsg = await Message.findOne({
        conversation: conversation._id,
        senderType: "agent",
      }).sort({ createdAt: -1 });

      if (lastAgentMsg) {
        const responseTime = (new Date() - lastAgentMsg.createdAt) / 1000; // seconds
        const profile = await AgentProfile.findOne({ user: conversation.assignedAgent });

        if (profile) {
          profile.avgResponseTime = (profile.avgResponseTime + responseTime) / 2;
          await profile.save();
        }
      }
    }

    // Save client message
    await Message.create({
      conversation: conversation._id,
      senderType: "client",
      content: text,
    });

    // Broadcast to agents/admins in real time
    emitNewMessage(conversation._id, { from: "client", content: text });

    // Notify assigned agent
    if (conversation.assignedAgent) {
      await sendNotification(
        conversation.assignedAgent,
        "New message",
        `New message from ${client.phoneNumber}`,
        { conversationId: conversation._id }
      );
    }

    // Update conversation last message/time
    conversation.lastMessage = text;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    console.log(`Message received from ${from}: ${text}`);

    // ✅ Respond OK once finished
    res.sendStatus(200);

  } catch (error) {
    console.error("Webhook error:", error.message);
    res.sendStatus(500);
  }
};

