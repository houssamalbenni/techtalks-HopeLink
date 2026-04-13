const  Service  = require("../models/services").Service;


class AdminService {

 static async findServiceById(serviceId){
  try { return await Service.findById(serviceId);}
  catch (error) { throw error;}
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
}

module.exports = AdminService;
