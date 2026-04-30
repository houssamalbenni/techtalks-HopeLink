// API service for Profile Settings backend integration
import api from "../../../utils/axios";

const API_ENDPOINTS = {
  GET_USER: (id) => `/users/${id}`,
  UPDATE_USER: () => `/users/`,
};

export const fetchUserProfile = async (userId) => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_USER(userId));
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put(
      API_ENDPOINTS.UPDATE_USER(),
      profileData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
