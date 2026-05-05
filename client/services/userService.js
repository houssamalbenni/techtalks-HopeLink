import { safeApiCall } from "../utils/helper";
import { ApiConst } from "../utils/APIConst";
import api from "../utils/axios";

// Auth
export const registerUser = (data) =>
  safeApiCall(api.post(ApiConst.REGISTER_USER,data));
 
export const loginUser = (data) =>
  safeApiCall(api.post(ApiConst.LOGIN_USER,data));

export const getAllUsers = () =>
  safeApiCall(api.get(ApiConst.GET_ALL_USERS));

export const getUserById = (id) =>
  safeApiCall(api.get(ApiConst.GET_USER_BY_ID(id)));

export const getUsersByRole = (role) =>
  safeApiCall(api.get(ApiConst.GET_USERS_BY_ROLE(role)));

export const updateCurrentUser = (data) =>
  safeApiCall(api.put(ApiConst.UPDATE_CURRENT_USER, data));

export const deleteCurrentUser = () =>
  safeApiCall(api.delete(ApiConst.DELETE_CURRENT_USER));

export const getUserRole = (userId) =>
  safeApiCall(api.get(ApiConst.GET_USER_ROLE, { data: { userId } }));
