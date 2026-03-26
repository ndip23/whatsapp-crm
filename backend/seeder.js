import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import AgentProfile from "./models/AgentProfile.js";

// Load environment variables from .env file
dotenv.config();

const seedUsers = async () => {
  try {
    // 1. Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!");

    // 2. Define test user emails
    const testUserEmails = ["superadmin@test.com", "admin@test.com", "agent@test.com"];

    // 3. Clear out old test users and their associated agent profiles for a clean slate
    const usersToDelete = await User.find({ email: { $in: testUserEmails } });
    const userIdsToDelete = usersToDelete.map(user => user._id);

    if (userIdsToDelete.length > 0) {
      await User.deleteMany({ _id: { $in: userIdsToDelete } });
      await AgentProfile.deleteMany({ user: { $in: userIdsToDelete } });
      console.log(`🧹 Cleared ${userIdsToDelete.length} old test users and their profiles.`);
    } else {
      console.log("No old test users found to clear.");
    }
    
    // The User model's pre-save hook will now automatically hash the password!
    const defaultPassword = "password123"; 

    // 4. Create SUPER_ADMIN
    const superAdmin = await User.create({
      name: "Main Super Admin",
      email: "superadmin@test.com",
      password: defaultPassword, // Password will be hashed by User.js model
      role: "SUPER_ADMIN",
      isActive: true,
      // No createdBy for the top-level super admin
    });
    console.log("✅ SUPER_ADMIN created: superadmin@test.com / password123");

    // 5. Create ADMIN (Created by Super Admin)
    const admin = await User.create({
      name: "Team Admin",
      email: "admin@test.com",
      password: defaultPassword, // Password will be hashed by User.js model
      role: "ADMIN",
      isActive: true,
      createdBy: superAdmin._id, // Linked to the super admin
    });
    console.log("✅ ADMIN created: admin@test.com / password123");

    // 6. Create AGENT (Created by Admin)
    const agent = await User.create({
      name: "Support Agent",
      email: "agent@test.com",
      password: defaultPassword, // Password will be hashed by User.js model
      role: "AGENT",
      isActive: true,
      createdBy: admin._id, // Linked to the admin
    });
    console.log("✅ AGENT created: agent@test.com / password123");

    // 7. Create Agent Profile for the newly created AGENT
    await AgentProfile.create({
      user: agent._id,
      avgResponseTime: 0, // Default to 0 for a new agent
    });
    console.log("✅ Agent Profile created for Support Agent.");

    console.log("🎉 All users seeded successfully! You can now log in.");
    process.exit(0); // Exit process successfully
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1); // Exit process with error
  }
};

// Execute the seeding function
seedUsers();