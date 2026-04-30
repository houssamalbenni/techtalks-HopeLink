// API service for Digital Identity Vault backend integration
import api from "../../../utils/axios";

const API_ENDPOINTS = {
  GET_USER_DOCUMENTS: (userId) => `/users/${userId}/documents`,
  UPDATE_DOCUMENT: () => `/users/documents`,
  DELETE_DOCUMENT: (docId) => `/users/documents/${docId}`,
  GET_VAULT_STATUS: (userId) => `/users/${userId}/vault-status`,
  UPDATE_VAULT_STATUS: () => `/users/vault-status`,
};

export const fetchUserDocuments = async (userId) => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_USER_DOCUMENTS(userId));
    return response.data;
  } catch (error) {
    console.error("Error fetching user documents:", error);
    throw error;
  }
};

export const fetchVaultStatus = async (userId) => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_VAULT_STATUS(userId));
    return response.data;
  } catch (error) {
    console.error("Error fetching vault status:", error);
    throw error;
  }
};

export const updateVaultStatus = async (vaultData) => {
  try {
    const response = await api.put(
      API_ENDPOINTS.UPDATE_VAULT_STATUS(),
      vaultData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating vault status:", error);
    throw error;
  }
};

export const updateDocument = async (documentData) => {
  try {
    const response = await api.put(
      API_ENDPOINTS.UPDATE_DOCUMENT(),
      documentData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

export const deleteDocument = async (docId) => {
  try {
    const response = await api.delete(
      API_ENDPOINTS.DELETE_DOCUMENT(docId)
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};
