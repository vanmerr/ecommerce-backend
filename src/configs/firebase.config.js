const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json'); // Thay bằng đường dẫn tới file service account key của bạn

// Khởi tạo Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Firestore database

module.exports = {db};