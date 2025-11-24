import express from 'express';
import bcrypt from 'bcryptjs';
import { loginUser, registerUser } from '../controllers/AuthController.js';
import User from '../models/User.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post("/init-superadmin", async (req, res) => {
  try {
    const existing = await User.findOne({ role: "SUPER_ADMIN" });
    if (existing) return res.status(400).json({ message: "Super Admin already exists" });

    const hashed = await bcrypt.hash("SuperAdmin123!", 10);
    const user = await User.create({
      name: "Super Admin",
      email: "superadmin@example.com",
      password: hashed,
      role: "SUPER_ADMIN"
    });

    res.json({ message: "Super Admin created", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;