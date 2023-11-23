const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js')

/**
 * @swagger
 * /admin/user/add:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account by providing user information.
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
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               accounttype:
 *                 type: string
 *             required:
 *               - id
 *               - citizen_id
 *               - firstname
 *               - lastname
 *               - accounttype
 *     responses:
 *       201:
 *         description: User registration successful. Returns the user's ID.
 *       400:
 *         description: Bad request (e.g., missing or invalid input data)
 *       500:
 *         description: Internal server error
 */

router.post('/user/add', adminController.Adduser);

/**
 * @swagger
 * /admin/user/getalluser:
 *   get:
 *     summary: Get all users (authentication required)
 *     description: Retrieve a list of all users (authentication required).
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: authenticate successful. Returns the list of users.
 *       401:
 *         description: No token provided , Invalid token
 *       500:
 *         description: Internal server error
 */


router.get('/user/getalluser',authMiddleware.authenticateToken ,adminController.getallusers);

module.exports = router;