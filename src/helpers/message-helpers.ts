// import fs from "fs";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const appPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const channel = "whatsapp:";

const client = twilio(accountSid, authToken);

export const sendMessage = async (
  to: string,
  body: string,
  mediaUrls?: string[]
) => {
  try {
    const message = await client.messages.create({
      mediaUrl: [
        "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      ],
      from: `${channel}${appPhoneNumber}`,
      to: `${channel}${to}`,
      body,
    });

    setTimeout(async () => {
      const lastMsg = await client.messages(message.sid).fetch();
      console.log(lastMsg);
    }, 10000);

    console.info(message);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTemplate = (template: string, params: any[]) => {
  let result = template;
  params.forEach((param, index) => {
    result = result.replace(`{${index + 1}}`, param);
  });
  return result;
};
