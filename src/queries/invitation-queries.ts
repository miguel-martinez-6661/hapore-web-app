import axios from "axios";

export const fetchInvitationStats = async (from: Date, to: Date) => {
  return await axios.get("/api/dashboard/invitations", {
    params: { from, to },
  });
};
