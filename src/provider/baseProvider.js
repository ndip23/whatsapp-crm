export default class WhatsAppProvider {
  async sendMessage(to, message) {
    throw new Error("sendMessage() not implemented");
  }

  async receiveMessage(reqBody) {
    throw new Error("receiveMessage() not implemented");
  }

  async verifyWebhook(req, res) {
    throw new Error("verifyWebhook() not implemented");
  }
}
