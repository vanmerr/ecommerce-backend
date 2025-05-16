const emailjs = require('emailjs-com');
const emailConfig = require('../configs/emailjs.config');
const { generateOtp } = require('./otp.service'); // Import hàm tạo OTP

/**
 * Gửi email với OTP
 * @param {string} recipientEmail - Email người nhận
 * @returns {Promise<Object>} - Kết quả gửi email và OTP
 */
const sendEmailWithOtp = async (recipientEmail) => {
  try {
    const { serviceID, templateID, userID } = emailConfig;

    // Tạo mã OTP và lưu vào cache
    const otp = generateOtp(recipientEmail);

    // Tham số cho template email
    const templateParams = {
      to_email: recipientEmail,
      otp_code: otp, // Truyền mã OTP vào template
    };

    // Gửi email
    const response = await emailjs.send(serviceID, templateID, templateParams, userID);

    return { success: true, message: 'OTP sent successfully', otp, response };
  } catch (error) {
    throw new Error('Failed to send OTP: ' + error.message);
  }
};

module.exports = { sendEmailWithOtp };