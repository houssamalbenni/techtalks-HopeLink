const RefugeeService = require("../service/refugeeService.js");
const asyncHandler = require("../middleware/asyncHandler");

exports.requestService = asyncHandler(async (req, res) => {
  const request = await RefugeeService.requestService(req.user.id, req.body);
  if (!request) {
    return res.status(404).json({
      success: false,
      message: "Try again later",
    });
  }
  return res.status(201).json({
    success: true,
    message: "Service requested successfully",
    data: { request },
  });
});

exports.getMyRequests = asyncHandler(async (req, res) => {
  const request = await RefugeeService.getMyRequests(req.user.id);
  if (!request) {
    return res.status(404).json({
      success: false,
      message: "no requests found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "My requests retrieved successfully",
    data: { request },
  });
});

exports.getRequestById = asyncHandler(async (req, res) => {
  const request = await RefugeeService.getRequestById(req.params.id);
  if (!request) {
    return res.status(404).json({
      success: false,
      message: "Request not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Request retrieved successfully",
    data: { request },
  });
});

exports.updateRequest = asyncHandler(async (req, res) => {
  const request = await RefugeeService.updateRequest(req.params.id, req.body);
  if (!request) {
    return res.status(404).json({
      success: false,
      message: "Error updating request",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Request updated successfully",
    data: { request },
  });
});

exports.getAllRequests = asyncHandler(async (req, res) => {
  const requests = await RefugeeService.getAllRequests();
  return res.status(200).json({
    success: true,
    message: "All requests retrieved successfully",
    data: { requests },
  });
});