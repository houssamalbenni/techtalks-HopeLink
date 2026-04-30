// API service for Digital Identity Vault backend integration
import api from "../../../utils/axios";

const API_ENDPOINTS = {
  GET_USER: (id) => `/users/${id}`,
  UPDATE_USER: () => `/users/`,
};

export const fetchUserDocuments = async (userId) => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_USER(userId));
    // Extract documents from user object
    return response.data?.documents || [];
  } catch (error) {
    console.error("Error fetching user documents:", error);
    throw error;
  }
};

export const fetchVaultStatus = async (userId) => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_USER(userId));
    // Extract vault status from user object
    return response.data?.vaultStatus || { locked: true };
  } catch (error) {
    console.error("Error fetching vault status:", error);
    throw error;
  }
};

export const updateVaultStatus = async (vaultData) => {
  try {
    // Send vault status in the user update payload
    const response = await api.put(
      API_ENDPOINTS.UPDATE_USER(),
      { vaultStatus: vaultData }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating vault status:", error);
    throw error;
  }
};

export const updateDocument = async (documentData) => {
  try {
    // Send document updates in the user update payload
    const response = await api.put(
      API_ENDPOINTS.UPDATE_USER(),
      { documents: documentData }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

export const deleteDocument = async (docId) => {
  try {
    // Get current user data, filter out document, and update
    const response = await api.put(
      API_ENDPOINTS.UPDATE_USER(),
      { documentToDelete: docId }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};
