import WhatsAppProvider from "../provider/baseProvider.js";
import twilio from "twilio";

export default class TwilioProvider extends WhatsAppProvider {
  constructor() {
    super();
    this.client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    this.from = `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`;
  }

  async sendMessage(to, message) {
    return await this.client.messages.create({
      from: this.from,
      to: `whatsapp:${to}`,
      body: message,
    });
  }

  async receiveMessage(reqBody) {
    const message = reqBody.Body;
    const from = reqBody.From.replace("whatsapp:", "");
    return { from, message };
  }

  async verifyWebhook(req, res) {
    res.sendStatus(200);
  }
}
