import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await User.create({
      name,
      email,
      password: hashed,
      role: "ADMIN",
      isActive: true,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "ADMIN" }).select("-password");
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await User.findOneAndDelete({ _id: id, role: "ADMIN" });
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = (({ name, email, isActive }) => ({ name, email, isActive }))(req.body);

    const admin = await User.findOne({ _id: id, role: "ADMIN" });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (updates.email && updates.email !== admin.email) {
      const exists = await User.findOne({ email: updates.email });
      if (exists) return res.status(400).json({ message: "Email already in use" });
    }

    Object.assign(admin, updates);
    await admin.save();

    res.json({ message: "Admin updated successfully", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
