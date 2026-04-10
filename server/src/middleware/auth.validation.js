import { body, validationResult } from 'express-validator';

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
export const registerRefugeeRules = [
  body('full_name')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ max: 150 }).withMessage('Max 150 characters'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .isLength({ max: 30 }).withMessage('Phone too long'),

  body('email')
    .optional({ nullable: true })
    .trim()
    .isEmail().withMessage('Invalid email format')
    .isLength({ max: 150 }).withMessage('Email too long'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

  body('family_number')
    .optional({ nullable: true })
    .isString(),

  body('need')
    .optional()
    .isArray().withMessage('Need must be an array')
    .custom((arr) => {
      const valid = ['food', 'shelter', 'medicine'];
      const invalid = arr.filter((v) => !valid.includes(v));
      if (invalid.length) throw new Error(`Invalid resource(s): ${invalid.join(', ')}`);
      return true;
    }),

  body('selected_language')
    .optional()
    .isIn(['en', 'ar', 'fr']).withMessage('Language must be en, ar, or fr'),

  validate,
];

// ─── Login Rules ──────────────────────────────────────────────────────────────
export const loginRules = [
  body('phone').optional({ nullable: true }).trim().isString(),

  body('email')
    .optional({ nullable: true })
    .trim()
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required'),

  body().custom((_, { req }) => {
    if (!req.body.phone && !req.body.email)
      throw new Error('Phone or email is required');
    return true;
  }),

  validate,
];