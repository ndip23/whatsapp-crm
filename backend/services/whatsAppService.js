// import axios from "axios";

// const GRAPH_API_URL = process.env.GRAPH_API_URL;
// const PHONE_ID = process.env.WHATSAPP_PHONE_ID;
// const TOKEN = process.env.WHATSAPP_TOKEN;

// /**
//  * Send WhatsApp message
//  * @param {string} to - WhatsApp recipient phone number (with country code)
//  * @param {string} message - Text message to send
//  */
// export const sendWhatsAppMessage = async (to, message) => {
//   try {
//     const payload = {
//       messaging_product: "whatsapp",
//       to,
//       type: "text",
//       text: { body: message },
//     };

//     const response = await axios.post(
//       `${GRAPH_API_URL}/${PHONE_ID}/messages`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Failed to send message:", error.response?.data || error.message);
//     throw new Error("WhatsApp API message send failed");
//   }
// };
// services/whatsAppService.js
import provider from "../provider/index.js";

export const sendWhatsAppMessage = async (to, message) => {
  return await provider.sendMessage(to, message);
};

export const receiveWhatsAppMessage = async (reqBody) => {
  return await provider.receiveMessage(reqBody);
};

export const verifyWhatsAppWebhook = async (req, res) => {
  return provider.verifyWebhook(req, res);
};
