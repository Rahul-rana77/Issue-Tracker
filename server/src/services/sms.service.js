import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function createMessage(body, to) {
  try {
    console.log("📤 Sending SMS to:", to);

    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });

    console.log("✅ SID:", message.sid);
    console.log("📊 Status:", message.status);

    return message;

  } catch (error) {
    console.error("❌ Twilio Error Code:", error.code);
    console.error("❌ Twilio Error Message:", error.message);

    throw error; // important for debugging
  }
}