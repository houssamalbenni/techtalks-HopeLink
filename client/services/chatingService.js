import { safeApiCall } from "../utils/helper";
import { ApiConst } from "../utils/APIConst";
import api from "../utils/axios";

export const getChatHistory = (otherUserId) =>
  safeApiCall(api.get(ApiConst.GET_CHAT_HISTORY(otherUserId)));
