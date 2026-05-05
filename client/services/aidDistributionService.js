import { safeApiCall } from "../utils/helper";
import { ApiConst } from "../utils/APIConst";
import api from "../utils/axios";
import { formatServiceAddress } from "./serviceService";

// Get all distributions (services with locations)
export const getAllDistributions = () =>
  safeApiCall(api.get(ApiConst.GET_ALL_DISTRIBUTIONS));

// Get a specific distribution by ID
export const getDistributionById = (id) =>
  safeApiCall(api.get(ApiConst.GET_DISTRIBUTION_BY_ID(id)));

// Get nearby distributions by coordinates
export const getNearbyDistributions = (lng, lat, distance = 5000) =>
  safeApiCall(
    api.get(ApiConst.GET_NEARBY_DISTRIBUTIONS, {
      params: { lng, lat, distance },
    })
  );

// Transform service data to batch format for UI
export const transformServiceToBatch = (service, index) => {
  const capacity = Number(service?.capacity || 0);
  const availability = Number(service?.availability || 0);
  const status = availability <= 0
    ? 'delivered'
    : availability < Math.max(capacity * 0.5, 1)
      ? 'in-transit'
      : 'pending';
  const [lng = 0, lat = 0] = service?.location?.coordinates || [];
  const mapTop = `${15 + (Math.abs(lat * 7 + index * 11) % 70)}%`;
  const mapLeft = `${15 + (Math.abs(lng * 5 + index * 13) % 70)}%`;
  
  return {
    id: service._id || `#SERVICE${index}`,
    category: service.title || 'Service',
    subcategory: service.facilities?.[0] || 'Distribution',
    from: 'Central Hub',
    to: formatServiceAddress(service.address),
    weight: `${Math.max(capacity - availability, 0) * 5 + 100} kg`,
    eta: service.intake_hours?.endTime || 'Scheduled today',
    status: status.charAt(0).toUpperCase() + status.slice(1),
    statusValue: status,
    mapTop,
    mapLeft,
    handler: 'Distribution Team',
    vehicle: `Vehicle-${index}`,
    lastUpdated: new Date().toLocaleString(),
    notes: `Service availability: ${service.availability || service.capacity}/` +
           `${service.capacity} slots available`,
    checkpoints: [
      `Service active since registration`,
      `Phone: ${service.phone_number || 'N/A'}`,
      `Intake hours: ${service.intake_hours?.startTime && service.intake_hours?.endTime ? `${service.intake_hours.startTime} - ${service.intake_hours.endTime}` : 'Not specified'}`,
    ],
    coordinates: service.location?.coordinates || [lng, lat],
    capacity: service.capacity,
    availability: service.availability,
  };
};
