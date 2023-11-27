const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js')

/**
 * @swagger
 * /user/getprofile:
 *   get:
 *     tags:
 *     - User
 *     summary: Get users Profile (authentication required)
 *     description: Retrieve a profile of users (authentication required).
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: authenticate successful. Returns the users profile.
 *       401:
 *         description: No token provided , Invalid token
 *       500:
 *         description: Internal server error
 */


router.get('/getprofile', authMiddleware.authenticateToken , userController.getprofile);

module.exports = router;