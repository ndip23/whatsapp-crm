import MetaProvider from "../provider/metaProvider.js";
import TwilioProvider from "../provider/twilioProvider.js";
import WhatsAcloudProvider from "../provider/whatsacloudProvider.js";

let provider;
console.log("WHATSAPP_PROVIDER:", process.env.WHATSAPP_PROVIDER);

let providerType = process.env.WHATSAPP_PROVIDER?.toLowerCase();

switch (providerType) {
  case "meta":
    provider = new MetaProvider();
    break;
  case "twilio":
    provider = new TwilioProvider();
    break;
  case "whatsacloud":
  case "whasacloud": // Support both spellings
    provider = new WhatsAcloudProvider();
    break;
  default:
    // Default to Meta provider if not specified (for development)
    console.warn("WHATSAPP_PROVIDER not specified, defaulting to Meta provider");
    provider = new MetaProvider();
}

export default provider;
