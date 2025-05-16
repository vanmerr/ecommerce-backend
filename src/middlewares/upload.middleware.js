const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../configs/cloudinary.config'); // Import cấu hình Cloudinary

// Cấu hình storage cho multer sử dụng Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Thư mục trên Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'avi', 'mkv'], // Các định dạng file được phép
    resource_type: 'auto', // Tự động xác định loại file (hình ảnh, video, v.v.)
  },
});

// Tạo middleware upload
const upload = multer({ storage });

// Hàm upload một file
const uploadSingle = (fieldName) => (req, res, next) => {
  const singleUpload = upload.single(fieldName);
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload failed', error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    req.fileUrl = req.file.path; // Lưu URL file vào req
    next();
  });
};

// Hàm upload nhiều file
const uploadMultiple = (fieldName, maxCount) => (req, res, next) => {
  const multipleUpload = upload.array(fieldName, maxCount);
  multipleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Files upload failed', error: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    req.fileUrls = req.files.map((file) => file.path); // Lưu danh sách URL file vào req
    next();
  });
};

module.exports = { uploadSingle, uploadMultiple };