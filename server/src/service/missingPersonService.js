const { MissingPerson } = require("../models/missingPersone");

class MissingPersonService {
  // Create a missing person case
  static async createCase(userId, body) {
    try {
      const missingCase = await MissingPerson.create({
        ...body,
        owner: userId,
      });
      return missingCase;
    } catch (error) {
      throw error;
    }
  }

  // Get all cases for a user
  static async getMyCases(userId) {
    try {
      return await MissingPerson.find({ owner: userId }).populate("owner", "full_name email");
    } catch (error) {
      throw error;
    }
  }

  // Get a specific case
  static async getCaseById(caseId) {
    try {
      return await MissingPerson.findById(caseId).populate("owner", "full_name email");
    } catch (error) {
      throw error;
    }
  }

  // Update a case
  static async updateCase(caseId, updateData) {
    try {
      const missingCase = await MissingPerson.findByIdAndUpdate(caseId, updateData, {
        new: true,
      });
      if (!missingCase) {
        const err = new Error("Case not found");
        err.statusCode = 404;
        throw err;
      }
      return missingCase;
    } catch (error) {
      throw error;
    }
  }

  // Add a note to a case
  static async addNote(caseId, noteData) {
    try {
      const missingCase = await MissingPerson.findByIdAndUpdate(
        caseId,
        { $push: { notes: noteData } },
        { new: true }
      );
      if (!missingCase) {
        const err = new Error("Case not found");
        err.statusCode = 404;
        throw err;
      }
      return missingCase;
    } catch (error) {
      throw error;
    }
  }

  // Get all cases (admin)
  static async getAllCases() {
    try {
      return await MissingPerson.find()
        .populate("owner", "full_name email")
        .sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }

  // Get cases by status
  static async getCasesByStatus(status) {
    try {
      return await MissingPerson.find({ status })
        .populate("owner", "full_name email")
        .sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MissingPersonService;
