// API service for Shelter Overview backend integration
import api from "../../../utils/axios";

const API_ENDPOINTS = {
  GET_ALL_SERVICES: "/admin/services",
};

export const fetchShelters = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_ALL_SERVICES);
    return response.data?.data || response.data || [];
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
