import Client from "../models/Client.js";
import User from "../models/User.js";


export const createClient = async (req, res) => {
    try{
        const {name, phoneNumber, country, assignedAgent, tags} = req.body;

        if(!phoneNumber) return res.status(400).json({message: "Phone number is required"});

        //Prevent duplicate phone number
        const existing = await Client.findOne({phoneNumber});
        if(existing) return res.status(400).json({message: "Client with this phone number already exists"});

        let agentToAssign = null;

        //Agent automatically assign to self
        if(req.user.role === "AGENT") {
            agentToAssign = req.user._id;

        } else if(req.user.role === "ADMIN" && assignedAgent) {

            //Admin can only assign to their own agents
            const adminOwnAgent = await User.findOne({
                _id: assignedAgent,
                role: "AGENT",
                createdBy: req.user._id
            });
            if(!adminOwnAgent) return res.status(403).json({message: "You can only assign client to your own agent(s)"});
                agentToAssign = adminOwnAgent._id;
        }
        const client = await Client.create({
            name,
            phoneNumber,
            country,
            assignedAgent: agentToAssign,
            createdBy: req.user._id,
            tags
        });
        res.status(201).json({message: "Client created successfully", client});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};


/**
  - Super Admin: sees all clients
  - Admin: sees own clients + their agents' clients
  - Agent: sees only their clients
 */
export const getClients = async (req, res) => {
  try {
    const { search, tag, country, isActive } = req.query;
    const query = {};

    // Role-based scope
    if (req.user.role === "AGENT") {
      query.assignedAgent = req.user._id;
    } else if (req.user.role === "ADMIN") {
      const agentIds = await User.find({ createdBy: req.user._id, role: "AGENT" }).distinct("_id");
      query.$or = [{ createdBy: req.user._id }, { assignedAgent: { $in: agentIds } }];
    }

    // Filters
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { phoneNumber: new RegExp(search, "i") },
      ];
    }
    if (tag) query.tags = tag;
    if (country) query.country = new RegExp(country, "i");
    if (isActive !== undefined) query.isActive = isActive === "true";

    const clients = await Client.find(query)
      .populate("assignedAgent", "name email role")
      .sort({ updatedAt: -1 });

    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate("assignedAgent", "name email")
      .populate("createdBy", "name email role");

    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const client = await Client.findById(id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    // Restrict by ownership
    if (req.user.role === "AGENT" && client.assignedAgent?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to edit this client" });
    }

    Object.assign(client, updates);
    await client.save();

    res.json({ message: "Client updated successfully", client });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


 //TOGGLE CLIENT ACTIVE STATE
 
export const toggleClientStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    client.isActive = !client.isActive;
    await client.save();

    res.json({ message: `Client ${client.isActive ? "activated" : "deactivated"}`, client });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};