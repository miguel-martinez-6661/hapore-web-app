import axios from "axios";

export const fetchRevenueStats = async (from: Date, to: Date) => {
  return await axios.get("/api/dashboard/revenue", { params: { from, to } });
};
