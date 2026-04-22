import { safeApiCall } from "../utils/helper";
import { ApiConst } from "../utils/APIConst";
import api from "../utils/axios";

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
  const statusOptions = ['pending', 'in-transit', 'delivered'];
  const status = statusOptions[index % 3];
  
  return {
    id: service._id || `#SERVICE${index}`,
    category: service.title || 'Service',
    subcategory: service.facilities?.[0] || 'Distribution',
    from: 'Central Hub',
    to: service.address || 'Unknown Location',
    weight: `${Math.floor(Math.random() * 500) + 100} kg`,
    eta: new Date(Date.now() + Math.random() * 86400000).toLocaleString(),
    status: status.charAt(0).toUpperCase() + status.slice(1),
    statusValue: status,
    mapTop: `${Math.random() * 70 + 15}%`,
    mapLeft: `${Math.random() * 70 + 15}%`,
    handler: 'Distribution Team',
    vehicle: `Vehicle-${index}`,
    lastUpdated: new Date().toLocaleString(),
    notes: `Service availability: ${service.availability || service.capacity}/` +
           `${service.capacity} slots available`,
    checkpoints: [
      `Service active since registration`,
      `Phone: ${service.phone_number || 'N/A'}`,
      `Intake hours: ${service.intake_hours || 'Not specified'}`,
    ],
    coordinates: service.location?.coordinates || [0, 0],
    capacity: service.capacity,
    availability: service.availability,
  };
};
