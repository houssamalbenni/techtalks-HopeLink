import { safeApiCall } from "../utils/helper";
import { ApiConst } from "../utils/APIConst";
import api from "../utils/axios";


export const getAllNotifications = () =>
  safeApiCall(api.get(ApiConst.GET_ALL_NOTIFICATIONS));

export const getUserNotifications = () =>
  safeApiCall(api.get(ApiConst.GET_USER_NOTIFICATIONS));

export const getNotificationById = (id) =>
  safeApiCall(api.get(ApiConst.GET_NOTIFICATION_BY_ID(id)));

export const deleteAllNotifications = () =>
  safeApiCall(api.delete(ApiConst.DELETE_ALL_NOTIFICATIONS));