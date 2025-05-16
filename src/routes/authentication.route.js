const express = require("express");
const { register } = require("../controllers/authentication.controller");

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: API endpoint to register a new user with optional avatar upload.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: User's email.
 *       - in: formData
 *         name: user_name
 *         type: string
 *         required: true
 *         description: User's user name.
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: User's password.
 *       - in: formData
 *         name: full_name
 *         type: string
 *         required: true
 *         description: User's full name.
 *       - in: formData
 *         name: phone_number
 *         type: string
 *         required: true
 *         description: User's phone number.
 *       - in: formData
 *         name: avatar
 *         type: file
 *         required: false
 *         description: User's avatar image (choose a file).
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     full_name:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     role:
 *                       type: string
 *                     created_at:
 *                       type: string
 *       400:
 *         description: Bad request, such as email or phone number already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email already exists
 */
router.post("/register", register);

module.exports = router;
