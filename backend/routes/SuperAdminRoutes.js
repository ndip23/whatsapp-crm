import express from "express";
import {
  createAdmin,
  getAllAdmins,
  deleteAdmin,
  updateAdmin,
} from "../controllers/SuperAdminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { superAdminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/admin", protect, superAdminOnly, createAdmin);
router.get("/view-admins", protect, superAdminOnly, getAllAdmins);
router.put("/update-admin/:id", protect, superAdminOnly, updateAdmin);
router.delete("/delete-admin/:id", protect, superAdminOnly, deleteAdmin);

export default router;
