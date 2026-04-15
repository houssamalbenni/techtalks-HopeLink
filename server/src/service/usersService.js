const  User  = require("../models/user").User;


class UsersService {


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

  static async updateUser(userId, updateData) {
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

  static async deleteUser(userId) {
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
