import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createAgent = async (req, res, next) => {
    try {
        const adminId = req.user._id
        const {name, email, password} = req.body;

        const isExistingAgent = await User.findOne({email});
        if(isExistingAgent) return res.status(400).json({message: "Email already exists"});

        const activeCount = await User.countDocuments({
            createdBy: adminId,
            role: "AGENT",
            isActive: true
        });

        if(activeCount >= 10) {
            return res
                .status(403)
                .json({message: "Agents limit reached. You can have at most 10 active agents"})
        }

        const hashed = await bcrypt.hash(password, 8);

        const agent = await User.create({
            name,
            email,
            password: hashed,
            role: "AGENT",
            createdBy: adminId,
            isActive: true
        });

         // strip password for response
        const safeAgent = {
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        role: agent.role,
        isActive: agent.isActive,
        createdAt: agent.createdAt,
        };

        res.status(201).json({message: "Agent account created successfully", safeAgent});
    } catch (error) {
        res.status(500).json({message: "Failed to create agent", error: error.message});
    }
};

export const viewAgents = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const query = { role: "AGENT" };

    //Super admin sees all
    if(req.user.role === "ADMIN") {
      query.createdBy = req.user._id;
    }

    if (search) query.$or = [{ name: new RegExp(search, "i") }, { email: new RegExp(search, "i") }];

    const agents = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);
    res.json({ agents, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch agents", error: error.message });
  }
};


export const updateAgent = async (req, res) => {
  try {

    const { id } = req.params;
    const updates = (({ name, email, isActive }) => ({ name, email, isActive }))(req.body);

    // find agent and ensure it's created by this admin
    const agent = await User.findOne({ _id: id, role: "AGENT" });
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    if(req.user.role === "ADMIN" && agent.createdBy?.toString() !== req.user._id.toString()) {
      return res.status(400).json({message: "Not authorized to edit this agent"})
    }

    // If email is being updated, check uniqueness
    if (updates.email && updates.email !== agent.email) {
      const isExistingEmail = await User.findOne({ email: updates.email });
      if (isExistingEmail) return res.status(400).json({ message: "Email already in use" });
    }

    // Apply updates 
    agent.name = updates.name ?? agent.name;
    agent.email = updates.email ?? agent.email;
    if (typeof updates.isActive === "boolean") agent.isActive = updates.isActive;

    await agent.save();

    const safeAgent = {
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      role: agent.role,
      isActive: agent.isActive,
      updatedAt: agent.updatedAt,
    };

    res.json({ message: "Agent updated", agent: safeAgent });
  } catch (err) {
    console.error("updateAgent error:", err);
    res.status(500).json({ message: "Failed to update agent", error: err.message });
  }
};


export const removeAgent = async (req, res) => {
    try {
        const {id} = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "Agent deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete agent", error: error.message });
    }
};