import { safeApiCall } from "../utils/helper";
import { ApiConst } from "../utils/APIConst";
import api from "../utils/axios";

// Auth
export const registerUser = (data) =>
  safeApiCall(api.post(ApiConst.REGISTER_USER,data));
 
export const loginUser = (data) =>
  safeApiCall(api.post(ApiConst.LOGIN_USER,data));
