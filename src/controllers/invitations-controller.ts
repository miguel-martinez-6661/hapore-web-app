import { twilioClient } from "@/helpers";

export const getInvitationsStats = async () => {
  const messagesList = await twilioClient.messages.list();
  const total = messagesList.length;
  const undelivered = messagesList.filter(
    (message) => message.status !== "delivered"
  ).length;
  const delivered = total - undelivered;
  return {
    total,
    undelivered,
    delivered,
  };
};
