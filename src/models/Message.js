import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversation: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Conversation", 
        required: true 
    },
    senderType: { 
        type: String, 
        enum: ["client", "agent"], 
        required: true 
    },
    senderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        refPath: "senderTypeRef" 
    }, // for agents
    senderTypeRef: { 
        type: String, 
        enum: ["User"], 
        default: "User" 
    },
    contentType: { 
        type: String, 
        enum: ["text", "image", "video", "document"], 
        default: "text" 
    },
    content: { 
        type: String, 
        required: true 
    }, // message text or media URL
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    },
    readAt: {
        type: Date
    },
    whatsappMessageId: { 
        type: String 
    }, // for mapping with WhatsApp Cloud API
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
