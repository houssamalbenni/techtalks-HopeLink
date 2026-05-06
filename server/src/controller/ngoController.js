const NGOService = require('../service/ngoService');
const asyncHandler = require('../middleware/asyncHandler');

exports.getRequestsForNgo = asyncHandler(async (req, res) => {
  const ngoId = req.user.id;
  const requests = await NGOService.getRequestsForNgo(ngoId);
  return res.status(200).json({
    success: true,
    message: 'NGO requests retrieved successfully',
    data: { requests },
  });
});
