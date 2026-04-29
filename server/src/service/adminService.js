const  Service  = require("../models/services").Service;

const mapServiceWithOccupancy = (serviceDoc) => {
  if (!serviceDoc) return serviceDoc;

  const service = typeof serviceDoc.toObject === "function" ? serviceDoc.toObject() : serviceDoc;
  const capacity = Number(service?.capacity);
  const availability = Number(service?.availability);

  const safeCapacity = Number.isFinite(capacity) && capacity > 0 ? capacity : 0;
  const safeAvailability = Number.isFinite(availability)
    ? Math.min(Math.max(availability, 0), safeCapacity)
    : 0;

  return {
    ...service,
    capacity: safeCapacity,
    availability: safeAvailability,
    occupied_beds: Math.max(safeCapacity - safeAvailability, 0),
  };
};


class AdminService {

 static async findServiceById(serviceId){
  try {
    const service = await Service.findById(serviceId);
    return mapServiceWithOccupancy(service);
  }
  catch (error) { throw error;}
 }

  static async getAllServices() {
    try {
      const services = await Service.find();
      return services.map(mapServiceWithOccupancy);
    } catch (error) {
      throw error;
    }
  }

  static async createService(body) {
    try {
      const service = await Service.create({
        title: body.title, // MUST match enum ResourceTitles
        location: {
          type: body.location.type || 'Point',
          coordinates: body.location.coordinates, // [lng, lat]
        },
        capacity: body.capacity,
        availability: body.availability ?? body.capacity, // default full
        images: body.images || [],
        phone_number: body.phone_number,
        address: body.address,
        requirements: body.requirements,
        intake_hours: body.intake_hours,
        facilities: body.facilities || [],
        owner_ngo: body.owner_ngo,
      });

      return service;
    } catch (error) {
      throw error;
    }
  }

  static async getNearbyServices(coordinates, maxDistance = 5000) {
    try {
      return await Service.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates,
            },
            $maxDistance: maxDistance,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteService(serviceId) {
    try {
      await Service.findByIdAndDelete(serviceId);
      return { message: "Service deleted successfully" };
    } catch (error) {
      throw error;
    }
  }

  static async updateService(serviceId, updateData) {
    try {
      const service = await Service.findByIdAndUpdate(serviceId, updateData, { new: true });
      if (!service) {
        const err = new Error("Service not found");
        err.statusCode = 404;
        throw err;
      }
      return service;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = AdminService;
