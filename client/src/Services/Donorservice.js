import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/donor`,
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const donorService = {
  /**
   * Get all donations for the logged-in donor
   * Response: { success: true, donations: [...] }
   */
  getUserDonations: async () => {
    const response = await api.get("/");
    return response.data.donations; // return the array directly
  },

  /**
   * Get total donations amount (all donors, platform-wide)
   * Response: { success: true, totalAmount: number }
   */
  getTotalDonations: async () => {
    const response = await api.get("/total");
    return response.data.totalAmount;
  },

  /**
   * Create a new donation
   * @param {number} amount - Donation amount
   */
  createDonation: async (amount) => {
    const response = await api.post("/", { amount });
    return response.data.donation;
  },
};

export default donorService;