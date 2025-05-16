const { getDocumentsByCondition, createDocument } = require('../utils/db.utils');
const bcrypt = require('bcrypt');

/**
 * Kiểm tra email đã tồn tại hay chưa
 * @param {string} email - Email cần kiểm tra
 * @returns {Promise<boolean>} - True nếu email đã tồn tại, ngược lại false
 */
const checkEmailExists = async (email) => {
  const users = await getDocumentsByCondition('users', { email });
  return users.length > 0;
};

/**
 * Kiểm tra số điện thoại đã tồn tại hay chưa
 * @param {string} phoneNumber - Số điện thoại cần kiểm tra
 * @returns {Promise<boolean>} - True nếu số điện thoại đã tồn tại, ngược lại false
 */
const checkPhoneExists = async (phoneNumber) => {
  const users = await getDocumentsByCondition('users', { phone_number: phoneNumber });
  return users.length > 0;
};

/**
 * Thêm người dùng mới
 * @param {import('../models/user.model').User} userData - Dữ liệu người dùng
 * @returns {Promise<import('../models/user.model').User>} - Người dùng đã được thêm
 * @throws {Error} - Nếu email hoặc số điện thoại đã tồn tại
 */
const addUser = async (userData) => {
  const {
    email,
    phone_number,
    password,
    full_name,
    user_name,
    address = '',
    avatar_url = '',
    role = 'user',
  } = userData;

  // Kiểm tra email đã tồn tại
  if (await checkEmailExists(email)) {
    throw new Error('Email already exists');
  }

  // Kiểm tra số điện thoại đã tồn tại
  if (await checkPhoneExists(phone_number)) {
    throw new Error('Phone number already exists');
  }

  // Hash mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo người dùng mới
  const newUser = await createDocument('users', {
    email,
    phone_number,
    password: hashedPassword,
    full_name,
    user_name,
    address,
    avatar_url,
    role,
    created_at: new Date().toISOString(),
  });

  return newUser;
};

module.exports = { addUser, checkEmailExists, checkPhoneExists };