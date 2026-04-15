const UsersService = require("../service/usersService.js");
const asyncHandler = require("../middleware/asyncHandler");



exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await UsersService.getAllUsers();
  return res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: { users },
  });
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await UsersService.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: { user },
  });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await UsersService.updateUser(req.params.id, req.body);
  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: { user },
  });
});

exports.getUsersByRole = asyncHandler(async (req, res) => {
  const users = await UsersService.getUsersByRole(req.params.role);
  return res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: { users },
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  await UsersService.deleteUser(req.params.id);
  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
