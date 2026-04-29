// API service for Add Shelter backend integration
import api from "../../../utils/axios";

const API_ENDPOINTS = {
  CREATE_SERVICE: "/admin/services",
};

export const createShelter = async (shelterData) => {
  try {
    const response = await api.post(API_ENDPOINTS.CREATE_SERVICE, shelterData);
    return response.data;
  } catch (error) {
    console.error("Error creating shelter:", error);
    throw error;
  }
};

export const saveShelterDraft = async (shelterData) => {
  try {
    // Save as draft - mark status as inactive
    const draftData = {
      ...shelterData,
      status: "draft",
    };
    const response = await api.post(API_ENDPOINTS.CREATE_SERVICE, draftData);
    return response.data;
  } catch (error) {
    console.error("Error saving shelter draft:", error);
    throw error;
  }
};
