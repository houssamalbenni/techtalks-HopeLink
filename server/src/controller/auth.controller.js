import { loginRefugee, registerRefugee } from '../service/auth.service.js';

// ─── Register ─────────────────────────────────────────────────────────────────
export const registerRefugeeController = async (req, res) => {
  try {
    const { user, token } = await registerRefugee(req.body);
    return res.status(201).json({
      success: true,
      message: 'Refugee registered successfully',
      data: { user, token },
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal server error',
    });
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────
export const loginRefugeeController = async (req, res) => {
  try {
    const { user, token } = await loginRefugee(req.body);
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { user, token },
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal server error',
    });
  }
};