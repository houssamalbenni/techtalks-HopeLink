<<<<<<< HEAD
const Service = require("../models/services").Service;
const { User } = require("../models/user");

class AdminService {

  static async findServiceById(serviceId) {
    try { return await Service.findById(serviceId); }
    catch (error) { throw error; }
  }

  static async getAllServices() {
    try {
      return await Service.find();
=======
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
>>>>>>> 6c4dac5da57378261fe538a3a7c53f446ea11374
    } catch (error) {
      throw error;
    }
  }

  static async createService(body) {
    try {
      const service = await Service.create({
<<<<<<< HEAD
        title: body.title,
        location: {
          type: body.location.type || 'Point',
          coordinates: body.location.coordinates,
        },
        capacity: body.capacity,
        availability: body.availability ?? body.capacity,
=======
        title: body.title, // MUST match enum ResourceTitles
        location: {
          type: body.location.type || 'Point',
          coordinates: body.location.coordinates, // [lng, lat]
        },
        capacity: body.capacity,
        availability: body.availability ?? body.capacity, // default full
>>>>>>> 6c4dac5da57378261fe538a3a7c53f446ea11374
        images: body.images || [],
        phone_number: body.phone_number,
        address: body.address,
        requirements: body.requirements,
        intake_hours: body.intake_hours,
        facilities: body.facilities || [],
        owner_ngo: body.owner_ngo,
      });
<<<<<<< HEAD
=======

>>>>>>> 6c4dac5da57378261fe538a3a7c53f446ea11374
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
<<<<<<< HEAD
            $geometry: { type: "Point", coordinates },
=======
            $geometry: {
              type: "Point",
              coordinates,
            },
>>>>>>> 6c4dac5da57378261fe538a3a7c53f446ea11374
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

<<<<<<< HEAD
  static async getWeeklyRegistrations() {
    try {
      const now = new Date();
      const weeks = [];

      for (let i = 5; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - (i + 1) * 7);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(now);
        weekEnd.setDate(now.getDate() - i * 7);
        weekEnd.setHours(23, 59, 59, 999);

        const registrations = await User.countDocuments({
          role: "refugee",
          createdAt: { $gte: weekStart, $lte: weekEnd },
        });

        weeks.push({
          month: `Week ${6 - i}`,
          registrations,
          relocations: 0,
        });
      }

      return weeks;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = AdminService;
=======
}

module.exports = AdminService;
>>>>>>> 6c4dac5da57378261fe538a3a7c53f446ea11374
