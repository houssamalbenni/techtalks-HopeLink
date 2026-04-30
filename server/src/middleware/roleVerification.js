const roleVerification = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized: no user data",
      });
    }

    // Check if user's role is included in allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: false,
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
};

module.exports = roleVerification;