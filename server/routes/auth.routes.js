const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller.js');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user by providing valid credentials (id and citizen_id).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               citizen_id:
 *                 type: string
 *             required:
 *               - id
 *               - citizen_id
 *     responses:
 *       200:
 *         description: Authentication successful. Returns a JWT token.
 *       401:
 *         description: Authentication failed. Invalid username or password.
 *       500:
 *         description: Internal server error
 */
router.post('/login', authController.login);

module.exports = router;