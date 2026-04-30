const MissingPersonService = require("../service/missingPersonService");
const asyncHandler = require("../middleware/asyncHandler");

// Create a missing person case
exports.createCase = asyncHandler(async (req, res) => {
  const missingCase = await MissingPersonService.createCase(req.user.id, req.body);
  return res.status(201).json({
    success: true,
    message: "Missing person case created successfully",
    data: { missingCase },
  });
});

// Get my cases
exports.getMyCases = asyncHandler(async (req, res) => {
  const cases = await MissingPersonService.getMyCases(req.user.id);
  return res.status(200).json({
    success: true,
    message: "My cases retrieved successfully",
    data: { cases },
  });
});

// Get a specific case
exports.getCaseById = asyncHandler(async (req, res) => {
  const missingCase = await MissingPersonService.getCaseById(req.params.id);
  if (!missingCase) {
    return res.status(404).json({
      success: false,
      message: "Case not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Case retrieved successfully",
    data: { missingCase },
  });
});

// Update a case
exports.updateCase = asyncHandler(async (req, res) => {
  const missingCase = await MissingPersonService.updateCase(req.params.id, req.body);
  if (!missingCase) {
    return res.status(404).json({
      success: false,
      message: "Case not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Case updated successfully",
    data: { missingCase },
  });
});

// Add note to case
exports.addNote = asyncHandler(async (req, res) => {
  const missingCase = await MissingPersonService.addNote(req.params.id, req.body);
  if (!missingCase) {
    return res.status(404).json({
      success: false,
      message: "Case not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Note added successfully",
    data: { missingCase },
  });
});

// Get all cases (admin)
exports.getAllCases = asyncHandler(async (req, res) => {
  const cases = await MissingPersonService.getAllCases();
  return res.status(200).json({
    success: true,
    message: "All cases retrieved successfully",
    data: { cases },
  });
});

// Get cases by status
exports.getCasesByStatus = asyncHandler(async (req, res) => {
  const cases = await MissingPersonService.getCasesByStatus(req.params.status);
  return res.status(200).json({
    success: true,
    message: "Cases retrieved successfully",
    data: { cases },
  });
});
