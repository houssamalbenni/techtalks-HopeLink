const AdminService = require("../service/adminService");
const asyncHandler = require("../middleware/asyncHandler");

exports.createService = asyncHandler(async (req, res) => {
  try {
    const service = await AdminService.createService(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


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
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
exports.getNearbyServices = asyncHandler(async (req, res) => {
  try {
    const { lng, lat, distance } = req.query;

    const services = await AdminService.getNearbyServices(
      [parseFloat(lng), parseFloat(lat)],
      parseInt(distance) || 5000,
    );

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
exports.deleteService = asyncHandler(async (req, res) => {
  try {
    const result = await AdminService.deleteService(req.params.id);
    if(!result) res.status(404).json({ message: "Service not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
