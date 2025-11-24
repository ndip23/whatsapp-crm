import Shift from "../models/Shift.js";
import AgentProfile from "../models/AgentProfile.js";
import moment from "moment-timezone";
import User from "../models/User.js";

/**
 * CREATE SHIFT
 */
export const createShift = async (req, res) => {
  try {
    const { name, startTime, endTime } = req.body;

    if (!name || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingShift = await Shift.findOne({ name });
    if (existingShift) {
      return res.status(400).json({ message: "Shift name already exists" });
    }

    const shift = await Shift.create({ name, startTime, endTime });
    res.status(201).json({ message: "Shift created successfully", shift });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET ALL SHIFTS
 */
export const getShifts = async (req, res) => {
  try {
    const shifts = await Shift.find().sort({ createdAt: -1 });
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * UPDATE SHIFT
 */
export const updateShift = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedShift = await Shift.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedShift) return res.status(404).json({ message: "Shift not found" });
    res.json({ message: "Shift updated successfully", shift: updatedShift });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * ASSIGN SHIFT TO AGENT
 */

export const assignShiftToAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    const { shiftId } = req.body;

    if (!agentId) return res.status(400).json({ message: "agentId is required in params" });
    if (!shiftId) return res.status(400).json({ message: "shiftId is required in body" });

    // Find the target user and ensure it's actually an agent
    const targetUser = await User.findById(agentId);
    if (!targetUser || targetUser.role !== "AGENT") {
      return res.status(404).json({ message: "Agent (user) not found" });
    }

    // Authorization: Admins can only manage their own agents
    if (req.user.role === "ADMIN") {
      // assume User.createdBy stores who created the agent
      if (!targetUser.createdBy || targetUser.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to assign this agent" });
      }
    }

    // Find the shift
    const shift = await Shift.findById(shiftId);
    if (!shift) return res.status(404).json({ message: "Shift not found" });

    // Find or create agent profile
    let agentProfile = await AgentProfile.findOne({ user: targetUser._id });
    if (!agentProfile) {
      agentProfile = new AgentProfile({ user: targetUser._id });
    }

    // 5) Assign shift and persist
    agentProfile.shift = shift._id;
    await agentProfile.save();

    // Optionally populate user and shift for response
    const populated = await AgentProfile.findById(agentProfile._id)
      .populate("user", "name email role createdBy")
      .populate("shift");

    res.json({ message: "Shift assigned to agent successfully", agentProfile: populated });
  } catch (err) {
    console.error("assignShiftToAgent error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * AUTO UPDATE ACTIVE STATUS
 * Runs manually or via cron every few minutes
 */

export const updateAgentStatusByShift = async (req, res) => {
  try {
    const agents = await AgentProfile.find()
      .populate("user", "name email role")
      .populate("shift");

    for (const agentProfile of agents) {
      if (!agentProfile.shift) continue;

      const now = moment().format("HH:mm");
      const { startTime, endTime, isActive } = agentProfile.shift;

      const withinShift = isActive && now >= startTime && now <= endTime;
      if (agentProfile.activeStatus !== withinShift) {
        agentProfile.activeStatus = withinShift;
        await agentProfile.save();
      }
    }

    res.json({ message: "Agent statuses updated based on current shift" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const updateAgentStatusByShift = async (req, res) => {
//   try {
//     const agents = await User.find().populate("shift");

//     for (const agent of agents) {
//       if (!agent.shift) continue;

//       const now = moment().format("HH:mm");
//       const { startTime, endTime, isActive } = agent.shift;

//       // Skip inactive shifts
//       if (!isActive) {
//         agent.activeStatus = false;
//         await agent.save();
//         continue;
//       }

//       const withinShift = now >= startTime && now <= endTime;
//       if (agent.activeStatus !== withinShift) {
//         agent.activeStatus = withinShift;
//         await agent.save();
//       }
//     }

//     res.json({ message: "Agent statuses updated based on current shift" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
