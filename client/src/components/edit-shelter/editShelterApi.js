// API service for Edit Shelter backend integration
import api from "../../../utils/axios";

const API_ENDPOINTS = {
  GET_SERVICE: (id) => `/admin/services/${id}`,
  UPDATE_SERVICE: (id) => `/admin/services/${id}`,
};

export const fetchShelter = async (shelterId) => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_SERVICE(shelterId));
    return response.data;
  } catch (error) {
    console.error("Error fetching shelter:", error);
    throw error;
  }
};

export const updateShelter = async (shelterId, shelterData) => {
  try {
    const response = await api.put(
      API_ENDPOINTS.UPDATE_SERVICE(shelterId),
      shelterData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating shelter:", error);
    throw error;
  }
};
