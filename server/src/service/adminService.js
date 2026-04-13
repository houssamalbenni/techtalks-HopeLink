const  Service  = require("../models/services").Service;


class AdminService {


  static async getAllServices() {
    try {
      return await Service.find();
    } catch (error) {
      throw error;
    }
  }

  static async createService(data) {
    try {
      const service = await Service.create({
        title: data.title, // MUST match enum ResourceTitles
        location: {
          type: "Point",
          coordinates: data.coordinates, // [lng, lat]
        },
        capacity: data.capacity,
        availability: data.availability ?? data.capacity, // default full
        images: data.images || [],
        phone_number: data.phone_number,
        address: data.address,
        requirements: data.requirements,
        intake_hours: data.intake_hours,
        facilities: data.facilities || [],
        owner_ngo: data.owner_ngo,
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
}

module.exports = AdminService;
