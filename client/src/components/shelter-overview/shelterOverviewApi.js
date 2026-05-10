// API service for Shelter Overview backend integration
import api from "../../../utils/axios";

const API_ENDPOINTS = {
  GET_ALL_SERVICES: "/admin/services",
};

export const fetchShelters = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_ALL_SERVICES);
    const raw = response.data?.data || response.data || [];
    if (!Array.isArray(raw)) return [];

    return raw.map((service) => {
      const capacity = Number(service?.capacity) || 0;
      const availability = Number(service?.availability) || 0;
      const occupied = Number(service?.occupied_beds);
      const used = Number.isFinite(occupied)
        ? occupied
        : Math.max(capacity - availability, 0);

      return {
        id: service?._id || service?.id,
        name: service?.address?.building || service?.address?.street || "Unnamed Shelter",
        address: service?.address?.street || "",
        city: service?.address?.city || "",
        capacity: used,
        total: capacity,
        status: service?.status || "active",
      };
    });
  } catch (error) {
    console.error("Error fetching shelters:", error);
    throw error;
  }
};

export const updateShelterStatus = async (id, status) => {
  try {
    const response = await api.put(`${API_ENDPOINTS.GET_ALL_SERVICES}/${id}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating shelter:", error);
    throw error;
  }
};

export const deleteShelterApi = async (id) => {
  try {
    const response = await api.delete(
      `${API_ENDPOINTS.GET_ALL_SERVICES}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting shelter:", error);
    throw error;
  }
};
