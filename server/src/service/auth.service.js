const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || "7d";

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
  });

class UserService {
  static async register(body) {
    const { password, phone, ...other } = body;
    const existingUser = await User.findOne({ phone });
    if (existingUser) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      ...other,
      phone,
      password: hashedPassword,
    });
    const token = generateToken(user);
    const safeUser = user.toObject();
    delete safeUser.password;
    return { user: safeUser, token };
  }
}

// ─── Register Refugee ─────────────────────────────────────────────────────────
const registerRefugee = async (body) => {
  const {
    full_name,
    phone,
    email,
    password,
    family_number,
    need,
    selected_language,
    device_id,
  } = body;

  // 1. Phone unique check
  if (await User.findOne({ phone })) {
    const err = new Error("Phone number already in use");
    err.statusCode = 409;
    throw err;
  }

  // 2. Email unique check (if provided)
  if (email && (await User.findOne({ email }))) {
    const err = new Error("Email already in use");
    err.statusCode = 409;
    throw err;
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // 4. Create user
  const user = await User.create({
    full_name,
    phone,
    email: email || null,
    password: hashedPassword,
    family_number: family_number || null,
    need: need || [],
    selected_language: selected_language || "en",
    device_id: device_id || null,
    role: "refugee",
  });

  const token = generateToken(user);
  const safeUser = user.toObject();
  delete safeUser.password;

  return { user: safeUser, token };
};

// ─── Login Refugee ────────────────────────────────────────────────────────────
const loginRefugee = async ({ phone, email, password }) => {
  // 1. Find by phone or email
  const user = await User.findOne(phone ? { phone } : { email });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  // 2. Role check
  if (user.role !== "refugee") {
    const err = new Error("Access denied: not a refugee account");
    err.statusCode = 403;
    throw err;
  }

  // 3. Password check
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken(user);
  const safeUser = user.toObject();
  delete safeUser.password;

  return { user: safeUser, token };
};

module.exports = {
  registerRefugee,
  loginRefugee,
};
module.exports = UserService;
