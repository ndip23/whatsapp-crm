import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  toggleClientStatus,
} from "../controllers/ClientController.js";

const router = express.Router();

router.post("/create-client", protect, createClient);
router.get("/view-clients", protect, getClients);
router.get("/read/:id", protect, getClientById);
router.put("/edit/:id", protect, updateClient);
router.patch("/:id/toggle", protect, toggleClientStatus);

export default router;
