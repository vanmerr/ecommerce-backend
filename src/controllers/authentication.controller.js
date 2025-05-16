const { addUser } = require('../services/user.service');

/**
 * Đăng ký người dùng mới
 * @param {import('express').Request} req - Yêu cầu HTTP
 * @param {import('express').Response} res - Phản hồi HTTP
 */
const register = async (req, res) => {
  try {
    const userData = req.body;

    // Gọi service để thêm người dùng mới
    const newUser = await addUser(userData);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        full_name: newUser.full_name,
        phone_number: newUser.phone_number,
        role: newUser.role,
        created_at: newUser.created_at,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register };