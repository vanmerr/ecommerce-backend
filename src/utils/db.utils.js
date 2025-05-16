const { db } = require('../configs/firebase.config');

/**
 * Tạo một tài liệu mới trong collection
 * @param {string} collectionName - Tên collection
 * @param {Object} data - Dữ liệu cần thêm
 * @returns {Promise<Object>} - Tài liệu đã được thêm
 */
const createDocument = async (collectionName, data) => {
  const docRef = db.collection(collectionName).doc();
  const createdAt = new Date().toISOString();
  await docRef.set({ ...data, id: docRef.id, created_at: createdAt });
  return { id: docRef.id, ...data, created_at: createdAt };
};

/**
 * Cập nhật một tài liệu trong collection
 * @param {string} collectionName - Tên collection
 * @param {string} docId - ID của tài liệu cần cập nhật
 * @param {Object} data - Dữ liệu cần cập nhật
 * @returns {Promise<void>}
 */
const updateDocument = async (collectionName, docId, data) => {
  const docRef = db.collection(collectionName).doc(docId);
  await docRef.update(data);
};

/**
 * Xóa một tài liệu trong collection
 * @param {string} collectionName - Tên collection
 * @param {string} docId - ID của tài liệu cần xóa
 * @returns {Promise<void>}
 */
const deleteDocument = async (collectionName, docId) => {
  const docRef = db.collection(collectionName).doc(docId);
  await docRef.delete();
};

/**
 * Lấy một tài liệu theo ID
 * @param {string} collectionName - Tên collection
 * @param {string} docId - ID của tài liệu cần lấy
 * @returns {Promise<Object|null>} - Tài liệu hoặc null nếu không tồn tại
 */
const getDocumentById = async (collectionName, docId) => {
  const docRef = db.collection(collectionName).doc(docId);
  const doc = await docRef.get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

/**
 * Lấy danh sách tài liệu theo điều kiện
 * @param {string} collectionName - Tên collection
 * @param {Object} conditions - Điều kiện (key-value)
 * @returns {Promise<Array<Object>>} - Danh sách tài liệu
 */
const getDocumentsByCondition = async (collectionName, conditions) => {
  let query = db.collection(collectionName);
  for (const [field, value] of Object.entries(conditions)) {
    query = query.where(field, '==', value);
  }
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Lấy danh sách tài liệu với phân trang
 * @param {string} collectionName - Tên collection
 * @param {number} limit - Số lượng tài liệu mỗi trang
 * @param {string|null} lastDocId - ID của tài liệu cuối cùng từ trang trước (nếu có)
 * @returns {Promise<{data: Array<Object>, lastDocId: string|null}>} - Dữ liệu và ID tài liệu cuối cùng
 */
const getDocumentsWithPagination = async (collectionName, limit, lastDocId = null) => {
  let query = db.collection(collectionName).orderBy('created_at').limit(limit);

  if (lastDocId) {
    const lastDoc = await db.collection(collectionName).doc(lastDocId).get();
    if (lastDoc.exists) {
      query = query.startAfter(lastDoc);
    }
  }

  const snapshot = await query.get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const newLastDocId = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null;

  return { data, lastDocId: newLastDocId };
};

module.exports = {
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentById,
  getDocumentsByCondition,
  getDocumentsWithPagination,
};