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

const NEED_TO_SERVICE_TITLES = {
  shelter: ["shelter"],
  food: ["food"],
  medcine: ["medcine", "hospital"],
};

const normalizeValue = (value) => String(value || "").trim().toLowerCase();

export const serviceMatchesNeed = (service, needs = []) => {
  if (!Array.isArray(needs) || needs.length === 0) {
    return true;
  }

  const serviceTitle = normalizeValue(service?.title || service?.type);
  return needs.some((need) => {
    const titles = NEED_TO_SERVICE_TITLES[normalizeValue(need)] || [normalizeValue(need)];
    return titles.includes(serviceTitle);
  });
};

export const filterServicesByNeed = (services = [], needs = []) =>
  services.filter((service) => serviceMatchesNeed(service, needs));

export const buildServiceStatus = (service) => {
  const availability = Number(service?.availability ?? 0);
  const capacity = Number(service?.capacity ?? 0);

  if (capacity === 0 && availability === 0) {
    return { label: "UNKNOWN", className: "status-limited" };
  }

  if (availability <= 0) {
    return { label: "FULL", className: "status-full" };
  }

  if (capacity > 0 && availability / capacity < 0.5) {
    return { label: "LIMITED", className: "status-limited" };
  }

  return { label: "OPEN", className: "status-open" };
};

export const formatServiceAddress = (address) => {
  if (!address) {
    return "Address not available";
  }

  if (typeof address === "string") {
    return address;
  }

  return [address.street, address.city, address.country]
    .filter(Boolean)
    .join(", ");
};
