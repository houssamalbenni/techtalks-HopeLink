const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { ResourceTitles, Facilities } = require('../constant/enum');

// ─── Reusable error handler ───────────────────────────────────────────────────
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
  return res.status(422).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

// ─── Register Rules (Refugee) ─────────────────────────────────────────────────
const registerRefugeeRules = [
  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ max: 150 })
    .withMessage("Max 150 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .isLength({ max: 30 })
    .withMessage("Phone too long"),

  body("email")
    .optional({ nullable: true })
    .trim()
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 150 })
    .withMessage("Email too long"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("family_number").optional({ nullable: true }).isString(),

  body("need")
    .optional()
    .isArray()
    .withMessage("Need must be an array")
    .custom((arr) => {
      const valid = ["food", "shelter", "medicine"];
      const invalid = arr.filter((v) => !valid.includes(v));
      if (invalid.length)
        throw new Error(`Invalid resource(s): ${invalid.join(", ")}`);
      return true;
    }),

  body("selected_language")
    .optional()
    .isIn(["en", "ar", "fr"])
    .withMessage("Language must be en, ar, or fr"),

  validate,
];

// ─── Login Rules ──────────────────────────────────────────────────────────────
const loginRules = [
  body("phone").optional({ nullable: true }).trim().isString(),

  body("email")
    .optional({ nullable: true })
    .trim()
    .isEmail()
    .withMessage("Invalid email format"),

  body("password").notEmpty().withMessage("Password is required"),

  body().custom((_, { req }) => {
    if (!req.body.phone && !req.body.email)
      throw new Error("Phone or email is required");
    return true;
  }),

  validate,
];
const validation_token = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ status: "error", message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ status: "error", message: "Invalid or expired token" });
  }
};
//  to dynamic check if the req is authenticated (has a valid token in its header) or no




const validateCreateService = (req, res, next) => {
  const body = req.body;

  if (!body.title) {
    return res.status(400).json({ message: "title is required" });
  }

  if (!Object.values(ResourceTitles).includes(body.title)) {
    return res.status(400).json({ message: "invalid title value" });
  }

  if (!body.capacity) {
    return res.status(400).json({ message: "capacity is required" });
  }

  if (!body.location || !body.location.coordinates) {
    return res.status(400).json({ message: "location.coordinates is required" });
  }
  if (body.intake_hours) {
  const { startTime, endTime } = body.intake_hours;

  if (!startTime || !endTime) {
    return res.status(400).json({
      message: "intake_hours must include startTime and endTime"
    });
  }
}

  if (
    !Array.isArray(body.location.coordinates) ||
    body.location.coordinates.length !== 2
  ) {
    return res.status(400).json({
      message: "coordinates must be [longitude, latitude]",
    });
  }

  if (body.facilities) {
    const invalidFacilities = body.facilities.filter(
      (f) => !Object.values(Facilities).includes(f)
    );

    if (invalidFacilities.length > 0) {
      return res.status(400).json({
        message: `invalid facilities: ${invalidFacilities.join(", ")}`,
      });
    }
  }
  next();
};

module.exports = {
  registerRefugeeRules,
  validateCreateService,
  loginRules,
  validation_token
};
