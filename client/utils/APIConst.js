export const ApiConst = {
  REGISTER_USER: "/auth/register",
  LOGIN_USER: "/auth/login",
  GET_ALL_USERS: "/users", // Admin
  GET_USER_BY_ID: (id) => `/users/${id}`,
  UPDATE_USER: (id) => `/users/${id}`,
  DELETE_USER: (id) => `/users/${id}`,
  GET_USER_ROLE: "/users/role",
  GET_USER_BY_ROLE: (role) => `/users/roles/${role}`,
  UPDATE_CURRENT_USER: "/users",
  DELETE_CURRENT_USER: "/users",
  
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

  GET_CHAT_HISTORY: (otherUserId) => `/chating/history/${otherUserId}`,
  CREATE_CHAT_REQUEST: "/chat-requests",
  GET_CHAT_REQUEST_QUEUE: "/chat-requests/queue",
  GET_ACTIVE_CHAT_REQUEST: "/chat-requests/my",
  GET_CHAT_REQUEST_BY_ID: (id) => `/chat-requests/${id}`,
  ACCEPT_CHAT_REQUEST: (id) => `/chat-requests/${id}/accept`,
};
