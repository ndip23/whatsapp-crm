import WhatsAppProvider from "../provider/baseProvider.js";
import axios from "axios";

export default class WhatsAcloudProvider extends WhatsAppProvider {
  async sendMessage(to, message) {
    const payload = { to, type: "text", text: { body: message } };
    const res = await axios.post(
      `${process.env.WHATSACLOUD_BASE_URL}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSACLOUD_API_KEY}`,
        },
      }
    );
    return res.data;
  }

  async receiveMessage(reqBody) {
    const message = reqBody.message?.text;
    const from = reqBody.message?.from;
    return { from, message };
  }

  async verifyWebhook(req, res) {
    if (req.query.token === process.env.WHATSACLOUD_VERIFY_TOKEN) {
      return res.status(200).send(req.query.challenge);
    }
    return res.sendStatus(403);
  }
}
