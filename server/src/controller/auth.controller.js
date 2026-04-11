const { loginRefugee, registerRefugee } = require("../service/auth.service.js");
const UserService = require("../service/auth.service.js");
const asyncHandler = require("../middleware/asyncHandler");
// ─── Register ─────────────────────────────────────────────────────────────────
exports.registerRefugeeController = asyncHandler(async (req, res) => {
  const { user, token } = await UserService.registerRefugee(req.body);
  return res.status(201).json({
    success: true,
    message: "Refugee registered successfully",
    data: { user, token },
  });
});

// ─── Login ────────────────────────────────────────────────────────────────────
exports.loginRefugeeController = async (req, res) => {
  try {
    const { user, token } = await loginRefugee(req.body);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user, token },
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

// module.exports = {
//   registerRefugeeController,
//   loginRefugeeController,
// };
