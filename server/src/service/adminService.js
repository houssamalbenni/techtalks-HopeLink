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
    } catch (error) {
      throw error;
    }
  }

  static async createService(body) {
    try {
      const service = await Service.create({
        title: body.title,
        location: {
          type: body.location.type || 'Point',
          coordinates: body.location.coordinates,
        },
        capacity: body.capacity,
        availability: body.availability ?? body.capacity,
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
            $geometry: { type: "Point", coordinates },
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