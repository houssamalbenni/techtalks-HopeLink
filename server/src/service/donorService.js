const User = require("../models/user").User;
const mongoose = require("mongoose");
const Donation = require("../models/donation").Donation;

class DonorService {
  static async createDonation(donorId, amount) { // donorId from the token
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

  static async getAllUserDonations(userId) { // userId from the token
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

  static async getDonationSummary() {
    try {
      const [totals, donors, monthlyBreakdown] = await Promise.all([
        Donation.aggregate([
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$amount" },
              totalDonations: { $sum: 1 },
            },
          },
        ]),
        User.aggregate([
          {
            $match: {
              role: "donor",
              donations: { $exists: true, $ne: [] },
            },
          },
          {
            $lookup: {
              from: "donations",
              localField: "donations",
              foreignField: "_id",
              as: "donationDocs",
            },
          },
          {
            $addFields: {
              donatedAmount: { $sum: "$donationDocs.amount" },
              donationCount: { $size: "$donationDocs" },
            },
          },
          {
            $project: {
              _id: 1,
              full_name: 1,
              donatedAmount: 1,
              donationCount: 1,
            },
          },
          {
            $sort: {
              donatedAmount: -1,
              full_name: 1,
            },
          },
        ]),
        Donation.aggregate([
          {
            $group: {
              _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" },
              },
              totalAmount: { $sum: "$amount" },
            },
          },
          {
            $sort: {
              "_id.year": 1,
              "_id.month": 1,
            },
          },
        ]),
      ]);

      return {
        totalAmount: totals[0]?.totalAmount || 0,
        totalDonations: totals[0]?.totalDonations || 0,
        totalDonors: donors.length,
        donors,
        monthlyBreakdown: monthlyBreakdown.map((entry) => ({
          label: `${entry._id.year}-${String(entry._id.month).padStart(2, "0")}`,
          totalAmount: entry.totalAmount,
        })),
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DonorService;
