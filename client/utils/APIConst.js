export const ApiConst = {

  REGISTER_USER: "/auth/register",
  LOGIN_USER: "/auth/login",
  GET_ALL_USERS: "/users", // Admin
  GET_USER_BY_ID: (id) => `/users/${id}`,
  GET_USERS_BY_ROLE: (role) => `/users/roles/${role}`,
  GET_USER_ROLE: "/users/role",
  UPDATE_USER: (id) => `/users/${id}`,
  DELETE_USER: (id) => `/users/${id}`,
  UPDATE_CURRENT_USER: "/users",
  DELETE_CURRENT_USER: "/users",

  CREATE_SERVICE: "/admin/services",
  GET_ALL_SERVICES: "/admin/services",
  GET_SERVICE_BY_ID: (id) => `/admin/services/${id}`,
  UPDATE_SERVICE: (id) => `/admin/services/${id}`,
  DELETE_SERVICE: (id) => `/admin/services/${id}`,


  DONATE: "/donor",
  GET_DONATIONS:(id)=> `/donor/${id}`,
  GET_TOTAL_DONATIONS: "/donor/total",

  CREATE_REQUEST: "/requests",

  // Refugee endpoints
  GET_ALL_REFUGEE_REQUESTS: "/refugee",
  GET_MY_REQUESTS: "/refugee/my-requests",
  GET_REFUGEE_REQUEST_BY_ID: (id) => `/refugee/${id}`,
  UPDATE_REFUGEE_REQUEST: (id) => `/refugee/${id}`,
  REQUEST_SERVICE: "/refugee",

  // Aid Distribution endpoints
  GET_ALL_DISTRIBUTIONS: "/admin/services",
  GET_DISTRIBUTION_BY_ID: (id) => `/admin/services/${id}`,
  GET_NEARBY_DISTRIBUTIONS: "/admin/services/nearby",

  // Family Reunification / Missing Person endpoints
  CREATE_MISSING_CASE: "/missing-person",
  GET_MY_MISSING_CASES: "/missing-person/my-cases",
  GET_MISSING_CASE_BY_ID: (id) => `/missing-person/${id}`,
  UPDATE_MISSING_CASE: (id) => `/missing-person/${id}`,
  ADD_NOTE_TO_CASE: (id) => `/missing-person/${id}/notes`,
  GET_ALL_MISSING_CASES: "/missing-person", // Admin
  GET_MISSING_CASES_BY_STATUS: (status) => `/missing-person/status/${status}`,
  // NGO endpoints
  NGO_GET_REQUESTS: "/ngo/requests",
};
