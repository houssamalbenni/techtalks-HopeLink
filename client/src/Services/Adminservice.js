import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const adminService = {
  /**
   * Get all services (shelters + hospitals)
   * Response: { data: [ ...services ] }
   */
  getAllServices: async () => {
    const response = await api.get("/services");
    return response.data.data; // return the array directly
  },

  /**
   * Get a single service by ID
   */
  getServiceById: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  /**
   * Create a new service (admin only)
   */
  createService: async (serviceData) => {
    const response = await api.post("/services", serviceData);
    return response.data;
  },

  /**
   * Update an existing service (admin only)
   */
  updateService: async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  },

  /**
   * Delete a service (admin only)
   */
  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },

  /**
   * Get nearby services using geo query
   * @param {number} lng - Longitude
   * @param {number} lat - Latitude
   * @param {number} distance - Distance in meters (default 5000)
   */
  getNearbyServices: async (lng, lat, distance = 5000) => {
    const response = await api.get("/services/nearby", {
      params: { lng, lat, distance },
    });
    return response.data.data;
  },
};

export default adminService;