import { safeApiCall } from "../utils/helper";
import { ApiConst } from "../utils/APIConst";
import api from "../utils/axios";

export const getAllServices = () =>
  safeApiCall(api.get(ApiConst.GET_ALL_SERVICES));

export const getServiceById = (id) =>
  safeApiCall(api.get(ApiConst.GET_SERVICE_BY_ID(id)));

export const getNearbyServices = (lng, lat, distance = 5000) =>
  safeApiCall(
    api.get(ApiConst.GET_NEARBY_DISTRIBUTIONS, {
      params: { lng, lat, distance },
    })
  );