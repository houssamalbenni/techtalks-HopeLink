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

  GET_ALL_REFUGEE_REQUESTS: "/refugee",
  GET_MY_REQUESTS: "/refugee/my-requests",
  GET_REFUGEE_REQUEST_BY_ID: (id) => `/refugee/${id}`,
  UPDATE_REFUGEE_REQUEST: (id) => `/refugee/${id}`,
  REQUEST_SERVICE: "/refugee",

  DONATE: "/donor",
  GET_DONATIONS: (id) => `/donor/${id}`,
  GET_TOTAL_DONATIONS: "/donor/total",

  CREATE_REQUEST: "/requests",

  GET_ALL_NOTIFICATIONS: "/notifications",
  GET_NOTIFICATION_BY_ID: (id) => `/notifications/${id}`,
  GET_USER_NOTIFICATIONS: "/notifications/user",
  DELETE_ALL_NOTIFICATIONS: "/notifications",

  GET_ALL_MISSING_PERSONS: "/family",
  GET_MISSING_PERSON_BY_ID: (id) => `/family/${id}`,
  CREATE_MISSING_PERSON: "/family",
  UPDATE_MISSING_PERSON: (id) => `/family/${id}`,
};
