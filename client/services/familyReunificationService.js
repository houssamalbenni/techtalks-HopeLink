import { safeApiCall } from "../utils/helper";
import { ApiConst } from "../utils/APIConst";
import api from "../utils/axios";

// Get all my missing person cases
export const getMyCases = () =>
  safeApiCall(api.get(ApiConst.GET_MY_MISSING_CASES));

// Get a specific case
export const getCaseById = (id) =>
  safeApiCall(api.get(ApiConst.GET_MISSING_CASE_BY_ID(id)));

// Create a new missing person case
export const createCase = (data) =>
  safeApiCall(api.post(ApiConst.CREATE_MISSING_CASE, data));

// Update a case
export const updateCase = (id, data) =>
  safeApiCall(api.put(ApiConst.UPDATE_MISSING_CASE(id), data));

// Add note to case
export const addNoteToCase = (id, noteData) =>
  safeApiCall(api.post(ApiConst.ADD_NOTE_TO_CASE(id), noteData));

// Get all cases (admin only)
export const getAllCases = () =>
  safeApiCall(api.get(ApiConst.GET_ALL_MISSING_CASES));

// Get cases by status (admin only)
export const getCasesByStatus = (status) =>
  safeApiCall(api.get(ApiConst.GET_MISSING_CASES_BY_STATUS(status)));

// Transform case data to UI format for display
export const transformCaseToUI = (missingCase, index) => {
  const statusMap = {
    inProgress: { display: "IN PROGRESS", class: "fr-status-progress" },
    verifying: { display: "VERIFYING", class: "fr-status-verifying" },
    matched: { display: "MATCHED", class: "fr-status-matched" },
    reunited: { display: "REUNITED", class: "fr-status-reunited" },
    closed: { display: "CLOSED", class: "fr-status-closed" },
  };

  const status = missingCase.status || "inProgress";
  const statusInfo = statusMap[status] || { display: "UNKNOWN", class: "fr-status-unknown" };

  const updatedTime = missingCase.updatedAt
    ? new Date(missingCase.updatedAt).toLocaleString()
    : "Unknown";

  return {
    id: missingCase._id || `#CASE${index}`,
    caseId: `Case #FR-${missingCase._id?.toString().slice(-6).toUpperCase() || index}`,
    relation: missingCase.relation || "Unknown",
    updated: `Last update: ${formatTimeAgo(missingCase.updatedAt)}`,
    status: statusInfo.display,
    statusClass: statusInfo.class,
    type: status === "matched" || status === "reunited" ? "matched" : "active",
    name: missingCase.name || "Unknown",
    lastKnownLocation: missingCase.last_known_location || "Not specified",
    lastKnownDate: missingCase.last_known_date 
      ? new Date(missingCase.last_known_date).toLocaleDateString()
      : "Not specified",
    photo: missingCase.photo || null,
    notes: missingCase.notes || [],
    owner: missingCase.owner,
  };
};

// Helper function to format time ago
const formatTimeAgo = (date) => {
  if (!date) return "Unknown";
  
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return past.toLocaleDateString();
};
