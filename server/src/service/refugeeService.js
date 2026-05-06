const Request = require("../models/aidRequests").AidRequest;
const  Service  = require("../models/services").Service;

class RefugeeService {
  static async requestService(userId,body) { // userId from the token
    try {
      const request = await Request.create({ ...body, user: userId });
      return request;
    } catch (error) {
      throw error;
    }
  }

  static async getMyRequests(userId) { // userId from the token
    try {
      return await Request.find({ user: userId }).populate("service");
    } catch (error) {
      throw error;
    }
  }

  static async getRequestById(requestId) {
    try {
      return await Request.findById(requestId).populate("service");
    } catch (error) {
      throw error;
    }
  }

  static async updateRequest(requestId, updateData) {
    try {
      const {status,...data} = updateData;
      const servece=await Request.findById(requestId).populate("service").populate("user");
      if(status && status==="approved"){
        await Service.findByIdAndUpdate(servece.service._id, {
          $inc: { availability: -servece.user.family_number ||-1 },
        });
      }
      const request = await Request.findByIdAndUpdate(requestId, {status, ...data}, {
        new: true,
      });
      if (!request) {
        const err = new Error("Request not found");
        err.statusCode = 404;
        throw err;
      }
      return request;
    } catch (error) {
      throw error;
    }
  }

  static async getAllRequests() {
    try {
      return await Request.find()
        .populate("service")
        .populate("user", "full_name");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RefugeeService;