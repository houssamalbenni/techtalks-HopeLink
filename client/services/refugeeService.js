import { safeApiCall } from "../utils/helper";
import { ApiConst } from "../utils/APIConst";
import api from "../utils/axios";

// Get all refuge requests (Admin only)
export const getAllRefugeeRequests = () =>
  safeApiCall(api.get(ApiConst.GET_ALL_REFUGEE_REQUESTS));

// Get current user's requests (Refugee)
export const getMyRequests = () =>
  safeApiCall(api.get(ApiConst.GET_MY_REQUESTS));

// Get a specific request by ID (Admin only)
export const getRefugeeRequestById = (id) =>
  safeApiCall(api.get(ApiConst.GET_REFUGEE_REQUEST_BY_ID(id)));

// Create a new service request (Refugee)
export const requestService = (data) =>
  safeApiCall(api.post(ApiConst.REQUEST_SERVICE, data));

// Update a request (Admin only)
export const updateRefugeeRequest = (id, data) =>
  safeApiCall(api.put(ApiConst.UPDATE_REFUGEE_REQUEST(id), data));
