import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import AgentProfile from "../models/AgentProfile.js";
import User from "../models/User.js";
import Client from "../models/Client.js";

/**
  GET DASHBOARD STATS
  Role-aware:
  - Super Admin: global stats
  - Admin: own + their agents' data
  - Agent: own only
 */


 // DASHBOARD STATS (Role-Aware with Shift Analytics)
 
export const getDashboardStats = async (req, res) => {
  try {
    let matchConversation = {};
    let matchClient = {};
    let agentFilter = {};

    // ROLE FILTERS
    if (req.user.role === "ADMIN") {
      const agentIds = await User.find({ createdBy: req.user._id, role: "AGENT" }).distinct("_id");
      matchConversation = { assignedAgent: { $in: agentIds } };
      matchClient = { assignedAgent: { $in: agentIds } };
      agentFilter = { user: { $in: agentIds } };

    } else if (req.user.role === "AGENT") {
      matchConversation = { assignedAgent: req.user._id };
      matchClient = { assignedAgent: req.user._id };
      agentFilter = { user: req.user._id };
    }

    // Core stats
    const [
      totalConversations,
      openConversations,
      closedConversations,
      totalMessages,
      totalClients,
      activeClients,
      inactiveClients,
    ] = await Promise.all([
      Conversation.countDocuments(matchConversation),
      Conversation.countDocuments({ ...matchConversation, status: "open" }),
      Conversation.countDocuments({ ...matchConversation, status: "closed" }),
      Message.countDocuments(),
      Client.countDocuments(matchClient),
      Client.countDocuments({ ...matchClient, isActive: true }),
      Client.countDocuments({ ...matchClient, isActive: false }),
    ]);

    // Shift & Agent stats
    const [agentsOnDuty, agentsOffDuty, shiftDistribution] = await Promise.all([
      AgentProfile.countDocuments({ ...agentFilter, activeStatus: true }),
      AgentProfile.countDocuments({ ...agentFilter, activeStatus: false }),
      AgentProfile.aggregate([
        { $match: agentFilter },
        {
          $lookup: {
            from: "shifts",
            localField: "shift",
            foreignField: "_id",
            as: "shift",
          },
        },
        { $unwind: "$shift" },
        {
          $group: {
            _id: "$shift.name",
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    res.json({
      totalConversations,
      openConversations,
      closedConversations,
      totalMessages,
      totalClients,
      activeClients,
      inactiveClients,
      agentsOnDuty,
      agentsOffDuty,
      shiftDistribution,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// AGENT PERFORMANCE (ADMIN and SUPER ADMIN)
 
export const getAgentPerformance = async (req, res) => {
  try {
    let match = {};
    if (req.user.role === "ADMIN") {
      const agentIds = await User.find({ createdBy: req.user._id, role: "AGENT" }).distinct("_id");
      match = { user: { $in: agentIds } };
    } else if (req.user.role === "AGENT") {
      match = { user: req.user._id };
    }

    const agents = await AgentProfile.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "conversations",
          localField: "user._id",
          foreignField: "assignedAgent",
          as: "conversations",
        },
      },
      {
        $project: {
          name: "$user.name",
          email: "$user.email",
          totalConversationsHandled: { $size: "$conversations" },
          avgResponseTime: 1,
          activeStatus: 1,
        },
      },
    ]);

    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


 // MESSAGES BY DAY (LAST 7 DAYS)
 // Role-based (Admin sees own agents; Agent sees own)
 
export const getMessagesByDay = async (req, res) => {
  try {
    let match = {};

    if (req.user.role === "ADMIN") {
      const agentIds = await User.find({ createdBy: req.user._id, role: "AGENT" }).distinct("_id");
      match = { sender: { $in: agentIds } };
    } else if (req.user.role === "AGENT") {
      match = { sender: req.user._id };
    }

    const messages = await Message.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": -1 } },
      { $limit: 7 },
    ]);

    res.json(messages.reverse()); // chronological order
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
