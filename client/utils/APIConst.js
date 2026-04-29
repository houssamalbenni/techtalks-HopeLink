export const ApiConst = {

  REGISTER_USER: "/auth/register",
  LOGIN_USER: "/auth/login",
  GET_ALL_USERS: "/users", // Admin
  GET_USER_BY_ID: (id) => `/users/${id}`,
  UPDATE_USER: (id) => `/users/${id}`,
  DELETE_USER: (id) => `/users/${id}`,

  CREATE_SERVICE: "/admin/services",
  GET_ALL_SERVICES: "/admin/services",
  GET_SERVICE_BY_ID: (id) => `/admin/services/${id}`,
  UPDATE_SERVICE: (id) => `/admin/services/${id}`,
  DELETE_SERVICE: (id) => `/admin/services/${id}`,


  DONATE: "/donor",
  GET_DONATIONS:(id)=> `/donor/${id}`,
  GET_TOTAL_DONATIONS: "/donor/total",

  CREATE_REQUEST: "/requests",

  // Aid Distribution endpoints
  GET_ALL_DISTRIBUTIONS: "/admin/services",
  GET_DISTRIBUTION_BY_ID: (id) => `/admin/services/${id}`,
  GET_NEARBY_DISTRIBUTIONS: "/admin/services/nearby",
};
