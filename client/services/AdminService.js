import { safeApiCall } from "../utils/helper";
import { ApiConst } from "../utils/APIConst";
import api from "../utils/axios";



export const updateService = (id, data) =>
  safeApiCall(api.put(ApiConst.UPDATE_SERVICE(id), data));

export const deleteService = (id) =>
  safeApiCall(api.delete(ApiConst.DELETE_SERVICE(id)));

export const getUserbyRole = () =>
  safeApiCall(api.get(ApiConst.GET_USER_BY_ROLE("refugee")));

export const getAllRequests = () =>
  safeApiCall(api.get(ApiConst.GET_ALL_REFUGEE_REQUESTS));

export const getTotalDonations = () =>
  safeApiCall(api.get(ApiConst.GET_TOTAL_DONATIONS));