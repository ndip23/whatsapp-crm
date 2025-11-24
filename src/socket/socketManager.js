import { io } from "../app.js";

/**
 * Emit new message event to agent or admin dashboard
 */
export const emitNewMessage = (conversationId, messageData) => {
  io.emit("new_message", { conversationId, message: messageData });
};

/**
 * Emit message sent confirmation
 */
export const emitMessageSent = (conversationId, messageData) => {
  io.emit("message_sent", { conversationId, message: messageData });
};

/**
 * Emit conversation assignment updates
 */
export const emitConversationAssigned = (conversationId, agentId) => {
  io.emit("conversation_assigned", { conversationId, agentId });
};
