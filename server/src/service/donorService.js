const User = require("../models/user").User;
const mongoose = require("mongoose");
const Donation = require("../models/donation").Donation;

class DonorService {
  static async createDonation(donorId, amount) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const donation = await Donation.create(
        [
          {
            amount: amount,
          },
        ],
        { session },
      );

      const donationDoc = donation[0];

      const updatedUser = await User.findByIdAndUpdate(
        donorId,
        {
          $push: { donations: donationDoc._id },
        },
        { new: true, session },
      );

      if (!updatedUser) {
        throw new Error("Donor not found");
      }

      await session.commitTransaction();
      session.endSession();

      return {
        success: true,
        donation: donationDoc,
        user: updatedUser,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  static async getAllUserDonations(userId) {
    try {
      const user = await User.findById(userId).populate("donations");
      if (!user) {
        const err = new Error("User not found");
        err.statusCode = 404;
        throw err;
      }
      return user.donations;
    } catch (error) {
      throw error;
    }
  }

  static async getTotalDonationAmmount() {
    try {
      const result = await Donation.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);
      return result[0]?.totalAmount || 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DonorService;
