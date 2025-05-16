const NodeCache = require('node-cache');
const crypto = require('crypto'); // Thư viện để tạo mã OTP

// Tạo instance của NodeCache với thời gian hết hạn mặc định là 5 phút
const otpCache = new NodeCache({ stdTTL: 300, checkperiod: 60 }); // 300 giây = 5 phút

/**
 * Tạo mã OTP, lưu vào cache và trả về mã OTP
 * @param {string} key - Email hoặc key để lưu OTP
 * @returns {string} - Mã OTP đã tạo
 */
const generateOtp = (key) => {
  const otp = crypto.randomInt(100000, 999999); // Tạo mã OTP ngẫu nhiên (6 chữ số)
  otpCache.set(key, otp); // Lưu OTP vào cache
  return otp; // Trả về mã OTP
};

/**
 * Lấy OTP từ cache
 * @param {string} key - Email hoặc key để lấy OTP
 * @returns {string|null} - Mã OTP hoặc null nếu không tồn tại
 */
const getOtp = (key) => {
  return otpCache.get(key);
};

/**
 * Xóa OTP khỏi cache
 * @param {string} key - Email hoặc key để xóa OTP
 */
const deleteOtp = (key) => {
  otpCache.del(key);
};

module.exports = { generateOtp, getOtp, deleteOtp };