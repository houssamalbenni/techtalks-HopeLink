const Service = require('../models/services').Service;
const Request = require('../models/aidRequests').AidRequest;

class NGOService {
  static async getServicesByNgo(ngoId) {
    try {
      return await Service.find({ owner_ngo: ngoId });
    } catch (error) {
      throw error;
    }
  }

  static async getRequestsForNgo(ngoId) {
    try {
      const services = await this.getServicesByNgo(ngoId);
      const serviceIds = services.map((s) => s._id);
      if (serviceIds.length === 0) return [];
      return await Request.find({ service: { $in: serviceIds } })
        .populate('service')
        .populate('user', 'full_name');
    } catch (error) {
      throw error;
    }
  }
}

module.exports = NGOService;
