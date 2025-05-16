const express = require('express');
const router = express.Router();
/**
 * @swagger
 * /:
 *   get:
 *     summary: Check if the API is running
 *     responses:
 *       200:
 *         description: API is running
 */
router.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports  = router;