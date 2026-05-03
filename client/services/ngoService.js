import { safeApiCall } from "../utils/helper";
import { ApiConst } from "../utils/APIConst";
import api from "../utils/axios";

export const getNgoRequests = () => safeApiCall(api.get(ApiConst.NGO_GET_REQUESTS));
