const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js").User;

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
  static async login({ phone, email, password }) {
    const user = await User.findOne(phone ? { phone } : { email });

    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
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
  }
}

module.exports = UserService;
