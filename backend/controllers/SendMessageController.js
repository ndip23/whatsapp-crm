import { sendWhatsAppMessage } from "../services/whatsAppService.js";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import Client from "../models/Client.js";
import { emitMessageSent } from "../socket/socketManager.js";

export const sendMessageController = async (req, res) => {
  try {
    const { clientId, message } = req.body;

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: "Client not found" });

    // Send via WhatsApp API
    await sendWhatsAppMessage(client.phoneNumber, message);

    // Find or create conversation
    let conversation = await Conversation.findOne({ client: client._id });
    if (!conversation) {
      conversation = await Conversation.create({
        client: client._id,
        status: "open",
        lastMessage: message,
        lastMessageAt: new Date(),
      });
    }

    // Save message in DB
    await Message.create({
      conversation: conversation._id,
      senderType: "agent",
      content: message,
    });

    const profile = await AgentProfile.findOne({ user: req.user._id });
    if (profile) {
      profile.totalConversationsHandled += 1;
      await profile.save();
    }

    emitMessageSent(conversation._id, { from: "agent", content: message });


    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
};
