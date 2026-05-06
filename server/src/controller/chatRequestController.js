const asyncHandler = require("../middleware/asyncHandler");
const ChatRequestService = require("../service/chatRequestService");

exports.createRequest = asyncHandler(async (req, res) => {
  if (req.user.role !== "refugee") {
    return res.status(403).json({
      success: false,
      message: "Only refugees can create chat requests",
    });
  }

  const { note, priority } = req.body || {};

  const request = await ChatRequestService.createRequest({
    refugeeId: req.user.id,
    note,
    priority,
  });

  return res.status(201).json({ success: true, data: request });
});

exports.listPending = asyncHandler(async (req, res) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({
      success: false,
      message: "Only doctors can view the request queue",
    });
  }

  const requests = await ChatRequestService.listPending();
  return res.status(200).json({ success: true, data: { requests } });
});

exports.getActiveForRefugee = asyncHandler(async (req, res) => {
  if (req.user.role !== "refugee") {
    return res.status(403).json({
      success: false,
      message: "Only refugees can view their active request",
    });
  }

  const request = await ChatRequestService.getActiveForRefugee(req.user.id);
  return res.status(200).json({ success: true, data: request });
});

exports.getById = asyncHandler(async (req, res) => {
  const request = await ChatRequestService.getById(req.params.id);

  if (!request) {
    return res.status(404).json({
      success: false,
      message: "Chat request not found",
    });
  }

  const isOwner = request.refugeeId?.toString() === req.user.id;
  const isDoctor = request.doctorId?.toString() === req.user.id;
  const canView = isOwner || isDoctor || req.user.role === "doctor";

  if (!canView) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to view this request",
    });
  }

  return res.status(200).json({ success: true, data: request });
});

exports.acceptRequest = asyncHandler(async (req, res) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({
      success: false,
      message: "Only doctors can accept chat requests",
    });
  }

  const request = await ChatRequestService.acceptRequest({
    requestId: req.params.id,
    doctorId: req.user.id,
  });

  if (!request) {
    return res.status(409).json({
      success: false,
      message: "Request already accepted",
    });
  }

  return res.status(200).json({ success: true, data: request });
});
