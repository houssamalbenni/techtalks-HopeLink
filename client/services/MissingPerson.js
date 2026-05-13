import { safeApiCall } from "../utils/helper";
import { ApiConst } from "../utils/APIConst";
import api from "../utils/axios";


export const getAllMissingPersons = async () => {
  return await safeApiCall(api.get(ApiConst.GET_ALL_MISSING_PERSONS));
};

export const getMissingPersonById = async (id) => {
  return await safeApiCall(api.get(ApiConst.GET_MISSING_PERSON_BY_ID(id)));
};

export const createMissingPerson = async (data) => {
  return await safeApiCall(api.post(ApiConst.CREATE_MISSING_PERSON, data));
};

export const updateMissingPerson = async (id, data) => {
  return await safeApiCall(api.put(ApiConst.UPDATE_MISSING_PERSON(id), data));
};