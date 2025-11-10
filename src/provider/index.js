import MetaProvider from "../provider/metaProvider.js";
import TwilioProvider from "../provider/twilioProvider.js";
import WhatsAcloudProvider from "../provider/whatsacloudProvider.js";

let provider;
console.log("WHATSAPP_PROVIDER:", process.env.WHATSAPP_PROVIDER);

let providerType = process.env.WHATSAPP_PROVIDER?.toLocaleLowerCase();

switch (providerType) {
  case "meta":
    provider = new MetaProvider();
    break;
  case "twilio":
    provider = new TwilioProvider();
    break;
  case "whasacloud":
    provider = new WhatsAcloudProvider();
    break;
  default:
    throw new Error("Invalid WHATSAPP_PROVIDER specified in .env");
}

export default provider;
