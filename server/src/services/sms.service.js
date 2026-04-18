import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function createMessage(body, to) {
  const message = await client.messages.create({
    body,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });
  try{
    console.log(message.body);
  } catch (error) {
    console.error('Error creating SMS message:', error.message);
  }
}