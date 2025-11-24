import Conversation from "../models/Conversation.js";
import User from "../models/User.js";
import { sendNotification } from "../services/notificationService.js";

export const getConversations = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "AGENT") {
      query.assignedAgent = req.user._id;
    } else if (req.user.role === "ADMIN") {
      // Admin sees conversations for agents they created
      const agentIds = await User.find({ createdBy: req.user._id, role: "AGENT" }).distinct("_id");
      query.assignedAgent = { $in: agentIds };
    }
    // SUPER_ADMIN sees all

    const conversations = await Conversation.find(query)
      .populate("client assignedAgent")
      .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (err) {
    console.error("getConversations error:", err);
    res.status(500).json({ message: err.message });
  }
};

 //Admins can only assign to their own agents; SuperAdmin can assign to any agent.
 
export const assignConversation = async (req, res) => {
  try {
    const { conversationId, agentId } = req.body;
    if (!conversationId || !agentId) return res.status(400).json({ message: "conversationId and agentId required" });

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) return res.status(404).json({ message: "Conversation not found" });

    const agent = await User.findOne({ _id: agentId, role: "AGENT" });
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    // Admin can only assign their own agents
    if (req.user.role === "ADMIN" && agent.createdBy?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to assign this agent" });
    }

    conversation.assignedAgent = agent._id;
    conversation.status = "open";
    await conversation.save();

    // Send notification to agent
    await sendNotification(
      agent._id,
      "conversation_assigned",
      `A new conversation with ${conversation.client.phoneNumber} has been assigned to you.`,
      { conversationId: conversation._id }
    );

    // create a notification (not included here)
    return res.json({ message: "Conversation assigned", conversation });
  } catch (err) {
    console.error("assignConversation error:", err);
    res.status(500).json({ message: err.message });
  }
};

 
export const setFollowUp = async (req, res) => {
  try {
    const { conversationId, followUpAt } = req.body;

    if (!conversationId)
      return res.status(400).json({ message: "conversationId required" });

    const conversation = await Conversation.findById(conversationId)
      .populate("client assignedAgent");

    if (!conversation)
      return res.status(404).json({ message: "Conversation not found" });

    // Permission checks
    if (req.user.role === "AGENT" && conversation.assignedAgent?._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to set follow-up for this conversation" });
    }

    if (req.user.role === "ADMIN") {
      const agent = await User.findById(conversation.assignedAgent);
      if (agent && agent.createdBy?.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to set follow-up for this conversation" });
      }
    }

    // Update follow-up time
    conversation.followUpAt = followUpAt ? new Date(followUpAt) : null;
    await conversation.save();

    // Notify agent if admin sets the follow-up
    if (conversation.assignedAgent && req.user.role !== "AGENT") {
      await sendNotification(
        conversation.assignedAgent._id,
        "followup_scheduled",
        `A follow-up has been scheduled for ${conversation.client.phoneNumber}.`,
        { conversationId: conversation._id, followUpAt }
      );
    }

    return res.json({ message: "Follow-up updated successfully", conversation });
  } catch (err) {
    console.error("setFollowUp error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const getConversationById = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findById(id).populate("client assignedAgent");
    if (!conversation) return res.status(404).json({ message: "Conversation not found" });

    // enforce scope as above
    if (req.user.role === "AGENT" && conversation.assignedAgent?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    if (req.user.role === "ADMIN") {
      const agent = await User.findById(conversation.assignedAgent);
      if (agent && agent.createdBy?.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }
    }

    res.json(conversation);
  } catch (err) {
    console.error("getConversationById error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const closeConversation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "conversationId required" });

    const conversation = await Conversation.findById(id).populate("client assignedAgent");
    if (!conversation) return res.status(404).json({ message: "Conversation not found" });

    //  Permission check
    if (req.user.role === "AGENT" && conversation.assignedAgent?._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to close this conversation" });
    }

    if (req.user.role === "ADMIN") {
      const agent = await User.findById(conversation.assignedAgent);
      if (agent && agent.createdBy?.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to close this conversation" });
      }
    }

    conversation.status = "closed";
    await conversation.save();

    // Notify relevant users
    if (conversation.assignedAgent) {
      await sendNotification(
        conversation.assignedAgent._id,
        "conversation_closed",
        `Conversation with ${conversation.client.phoneNumber} has been closed.`,
        { conversationId: conversation._id }
      );
    }

    return res.json({ message: "Conversation closed", conversation });
  } catch (err) {
    console.error("closeConversation error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const startTyping = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Only assigned agent can lock the conversation
    if (conversation.assignedAgent?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not assigned to this conversation" });
    }

    // If conversation already locked by another agent and not expired
    if (
      conversation.isLocked &&
      conversation.lockedBy?.toString() !== req.user._id.toString() &&
      conversation.lockExpiresAt &&
      conversation.lockExpiresAt > new Date()
    ) {
      return res.status(423).json({
        message: "Another agent is currently typing a reply to this conversation",
      });
    }

    // Lock it for this agent for 30 seconds
    const lockDuration = 30 * 1000; // 30 seconds
    conversation.isLocked = true;
    conversation.lockedBy = req.user._id;
    conversation.lockExpiresAt = new Date(Date.now() + lockDuration);

    await conversation.save();

    res.json({
      message: "Typing lock acquired",
      expiresAt: conversation.lockExpiresAt,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const stopTyping = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Only the locking agent can unlock
    if (conversation.lockedBy?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You cannot unlock this conversation" });
    }

    conversation.isLocked = false;
    conversation.lockedBy = null;
    conversation.lockExpiresAt = null;
    await conversation.save();

    res.json({ message: "Typing lock released" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export default {
  getConversations,
  assignConversation,
  setFollowUp,
  getConversationById,
  closeConversation,
  startTyping,
  stopTyping
};
