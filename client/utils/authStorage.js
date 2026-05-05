const AUTH_KEYS = {
  token: "token",
  userId: "userId",
  role: "role",
  need: "need",
};

const isBrowser = () => typeof window !== "undefined" && window.localStorage;

const setItem = (key, value) => {
  if (!isBrowser() || value === undefined || value === null || value === "") {
    return;
  }

  window.localStorage.setItem(key, value);
};

const getItem = (key) => {
  if (!isBrowser()) {
    return null;
  }

  return window.localStorage.getItem(key);
};

export const saveAuthSession = ({ token, user, need } = {}) => {
  setItem(AUTH_KEYS.token, token);

  if (user?._id) {
    setItem(AUTH_KEYS.userId, user._id);
  }

  if (user?.role) {
    setItem(AUTH_KEYS.role, user.role);
  }

  const resolvedNeed = need || user?.need;
  if (Array.isArray(resolvedNeed)) {
    setItem(AUTH_KEYS.need, JSON.stringify(resolvedNeed));
  }
};

export const getStoredUserId = () => getItem(AUTH_KEYS.userId);

export const getStoredUserRole = () => getItem(AUTH_KEYS.role);

export const getStoredUserNeed = () => {
  const rawNeed = getItem(AUTH_KEYS.need);
  if (!rawNeed) {
    return [];
  }

  try {
    const parsedNeed = JSON.parse(rawNeed);
    return Array.isArray(parsedNeed) ? parsedNeed : [];
  } catch {
    return [];
  }
};

export const clearAuthSession = () => {
  if (!isBrowser()) {
    return;
  }

  Object.values(AUTH_KEYS).forEach((key) => window.localStorage.removeItem(key));
};
