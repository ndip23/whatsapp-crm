import axios from "axios";
import WhatsAppProvider from "../provider/baseProvider.js";

export default class MetaProvider extends WhatsAppProvider {
  constructor() {
    super();
    this.apiUrl = process.env.GRAPH_API_URL;
    this.phoneId = process.env.WHATSAPP_PHONE_ID;
    this.token = process.env.WHATSAPP_TOKEN;
  }

  async sendMessage(to, message) {
    const payload = {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: message },
    };

    const response = await axios.post(
      `${this.apiUrl}/${this.phoneId}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }

  async receiveMessage(reqBody) {
    const entry = reqBody.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];
    if (!message) return null;

    return {
      from: message.from,
      message: message.text?.body || "",
    };
  }

  async verifyWebhook(req, res) {
    const verify_token = process.env.VERIFY_TOKEN;
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token && mode === "subscribe" && token === verify_token) {
      return res.status(200).send(challenge);
    }
    return res.sendStatus(403);
  }
}
