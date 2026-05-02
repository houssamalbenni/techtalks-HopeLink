import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const adminService = {
  getAllServices: async () => {
    const response = await api.get("/services");
    return response.data.data;
  },

  getServiceById: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  createService: async (serviceData) => {
    const response = await api.post("/services", serviceData);
    return response.data;
  },

  updateService: async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  },

  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },

  getNearbyServices: async (lng, lat, distance = 5000) => {
    const response = await api.get("/services/nearby", {
      params: { lng, lat, distance },
    });
    return response.data.data;
  },

  getWeeklyRegistrations: async () => {
    const response = await api.get("/stats/weekly-registrations");
    return response.data.data;
  },

  getUserDemographics: async () => {
    const response = await api.get("/stats/demographics");
    return response.data.data;
  },
};

export default adminService;