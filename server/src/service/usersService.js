<<<<<<< HEAD
const User = require("../models/user").User;

class UsersService {
  // توزيع الأعمار
  static async getDemographics() {
    const users = await User.find();
    let adults = 0, children = 0, elderly = 0, unspecified = 0;
    const now = new Date();
    users.forEach(u => {
      if (!u.dob) { unspecified++; return; }
      const age = Math.floor((now - new Date(u.dob)) / (365.25 * 24 * 60 * 60 * 1000));
      if (age >= 0 && age <= 17) children++;
      else if (age >= 18 && age <= 65) adults++;
      else if (age > 65) elderly++;
      else unspecified++;
    });
    const total = adults + children + elderly + unspecified;
    return [
      { name: "Adults (18-65)", value: total ? Math.round((adults / total) * 100) : 0 },
      { name: "Children (0-17)", value: total ? Math.round((children / total) * 100) : 0 },
      { name: "Elderly (65+)", value: total ? Math.round((elderly / total) * 100) : 0 },
      { name: "Unspecified", value: total ? Math.round((unspecified / total) * 100) : 0 },
    ];
  }
=======
const  User  = require("../models/user").User;


class UsersService {
>>>>>>> 6c4dac5da57378261fe538a3a7c53f446ea11374

  static async getAllUsers() {
    try {
      return await User.find();
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(userId) {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(userId, updateData) { // userId from the token
    try {
      const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
      if (!user) {
        const err = new Error("User not found");
        err.statusCode = 404;
        throw err;
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUsersByRole(role) {
    try {
      return await User.find({ role });
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(userId) { // userId from the token
    try {
      await User.findByIdAndDelete(userId);
      return { message: "User deleted successfully" };
    } catch (error) {
      throw error;
    }
  }

  static async getUserRole(body){
    try {
      const user = await User.findById(body.userId);
      return user.role;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersService;
