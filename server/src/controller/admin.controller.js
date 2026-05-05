const AdminService = require("../service/adminService");
const asyncHandler = require("../middleware/asyncHandler");
<<<<<<< HEAD
const { User } = require("../models/user");
const { Notification } = require("../models/notifications");
=======
>>>>>>> 6c4dac5da57378261fe538a3a7c53f446ea11374

exports.createService = asyncHandler(async (req, res) => {
  try {
    const service = await AdminService.createService(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

<<<<<<< HEAD
exports.findServiceById = asyncHandler(async (req, res) => {
  try {
    const service = await AdminService.findServiceById(req.params.id);
    res.status(200).json(service);
  } catch (error) {
    res.status(404).json({ message: "Service not found" });
  }
});

exports.getService = asyncHandler(async (req, res) => {
  try {
    const services = await AdminService.getAllServices();
    res.status(200).json({ data: services });
=======

exports.findServiceById = asyncHandler(async (req,res) => {
  try {
    const service = await AdminService.findServiceById(req.params.id);
    res.status(200).json(service);
  } catch (error){
    res.status(404).json({ message: "Service not found"});
  }
});
exports.getService = asyncHandler(async (req, res) => {
  try {
    const services = await AdminService.getAllServices();
    res.status(200).json({data:services});
>>>>>>> 6c4dac5da57378261fe538a3a7c53f446ea11374
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
<<<<<<< HEAD

exports.getNearbyServices = asyncHandler(async (req, res) => {
  try {
    const { lng, lat, distance } = req.query;
=======
exports.getNearbyServices = asyncHandler(async (req, res) => {
  try {
    const { lng, lat, distance } = req.query;

>>>>>>> 6c4dac5da57378261fe538a3a7c53f446ea11374
    const services = await AdminService.getNearbyServices(
      [parseFloat(lng), parseFloat(lat)],
      parseInt(distance) || 5000,
    );
<<<<<<< HEAD
    res.status(200).json({ data: services });
=======

    res.status(200).json({data:services});
>>>>>>> 6c4dac5da57378261fe538a3a7c53f446ea11374
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
<<<<<<< HEAD

exports.deleteService = asyncHandler(async (req, res) => {
  try {
    const result = await AdminService.deleteService(req.params.id);
    if (!result) res.status(404).json({ message: "Service not found" });
=======
exports.deleteService = asyncHandler(async (req, res) => {
  try {
    const result = await AdminService.deleteService(req.params.id);
    if(!result) res.status(404).json({ message: "Service not found" });
>>>>>>> 6c4dac5da57378261fe538a3a7c53f446ea11374
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.updateService = asyncHandler(async (req, res) => {
  try {
    const service = await AdminService.updateService(req.params.id, req.body);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

<<<<<<< HEAD
exports.getWeeklyRegistrations = asyncHandler(async (req, res) => {
  try {
    const stats = await AdminService.getWeeklyRegistrations();
    res.status(200).json({ data: stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getDemographics = asyncHandler(async (req, res) => {
  try {
    const now = new Date();

    const adultStart = new Date(now.getFullYear() - 65, now.getMonth(), now.getDate());
    const adultEnd = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
    const childCutoff = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
    const elderlyCutoff = new Date(now.getFullYear() - 65, now.getMonth(), now.getDate());

    const [adults, children, elderly, unspecified] = await Promise.all([
      User.countDocuments({ role: "refugee", dob: { $gte: adultStart, $lte: adultEnd } }),
      User.countDocuments({ role: "refugee", dob: { $gt: childCutoff } }),
      User.countDocuments({ role: "refugee", dob: { $lt: elderlyCutoff } }),
      User.countDocuments({ role: "refugee", dob: null }),
    ]);

    const total = adults + children + elderly + unspecified || 1;

    res.status(200).json({
      data: [
        { name: "Adults (18-65)", value: Math.round((adults / total) * 100) },
        { name: "Children (0-17)", value: Math.round((children / total) * 100) },
        { name: "Elderly (65+)", value: Math.round((elderly / total) * 100) },
        { name: "Unspecified", value: Math.round((unspecified / total) * 100) },
      ]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getRecentActivity = asyncHandler(async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json({ data: notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
=======
>>>>>>> 6c4dac5da57378261fe538a3a7c53f446ea11374
