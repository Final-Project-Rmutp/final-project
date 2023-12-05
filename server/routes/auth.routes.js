const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller.js');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *     - Auth
 *     summary: User login
 *     description: Authenticate a user by providing valid credentials (id and citizen_id).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pin:
 *                 type: string
 *                 example: admin
 *               citizen_id:
 *                 type: string
 *                 example: admin
 *             required:
 *               - id
 *               - citizen_id
 *     responses:
 *       200:
 *         description: Authentication successful. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: "Authentication successful"
 *                  token:
 *                    type: string
 *                    example: "token"
 *                  account_role:
 *                    type: string
 *                    example: "user"
 *       401:
 *         description: Authentication failed. Invalid username or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Authentication failed. Invalid username or password.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Internal server error
 */
router.post('/login', authController.login);

module.exports = router;