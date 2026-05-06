import { safeApiCall } from "../utils/helper";
import { ApiConst } from "../utils/APIConst";
import api from "../utils/axios";

export const createChatRequest = (payload) =>
  safeApiCall(api.post(ApiConst.CREATE_CHAT_REQUEST, payload));

export const getChatRequestQueue = () =>
  safeApiCall(api.get(ApiConst.GET_CHAT_REQUEST_QUEUE));

export const getActiveChatRequest = () =>
  safeApiCall(api.get(ApiConst.GET_ACTIVE_CHAT_REQUEST));

export const getChatRequestById = (id) =>
  safeApiCall(api.get(ApiConst.GET_CHAT_REQUEST_BY_ID(id)));

export const acceptChatRequest = (id) =>
  safeApiCall(api.post(ApiConst.ACCEPT_CHAT_REQUEST(id)));
