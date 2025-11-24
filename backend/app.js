import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from 'http';
import { Server } from "socket.io";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import WhatsAppRoutes from "./routes/WhatsAppRoutes.js";
import NotificationRoutes from "./routes/NotificationRoutes.js"
import { startFollowUpJob } from "./jobs/followUpJob.js";
import ConversationRoutes from "./routes/ConversationRoutes.js"
import AnalyticsRoutes from "./routes/AnalyticsRoutes.js"
import superAdminRoutes from "./routes/SuperAdminRoutes.js";
import ClientRoutes from "./routes/ClientRoutes.js"
import ShiftRoutes from "./routes/ShiftRoutes.js"


connectDB();

const app = express();
const server = http.createServer(app);

//Socket.io instance
export const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173", 
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    },
});


app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(morgan("dev"));


app.use("/api/auth", AuthRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/whatsapp", WhatsAppRoutes);
app.use("/api/notifications", NotificationRoutes);
app.use("/api/conversations", ConversationRoutes);
app.use("/api/analytics", AnalyticsRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/client", ClientRoutes);
app.use("/api/shift", ShiftRoutes);


app.get("/", (req, res) => res.send("Backend API is running"));

//Socket.io connection
io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined personal room`);
    })

    //When client disconnects
    socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

startFollowUpJob();
console.log("Follow up automation started");
