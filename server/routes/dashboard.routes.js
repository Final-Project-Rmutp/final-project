const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const dashboardController = require('../controller/dashboard.controller.js');

/**
 * @swagger
 * /dashboard/getreserveddata:
 *   get:
 *     tags:
 *     - Dashboard
 *     summary: Get users Profile (authentication required)
 *     description: Retrieve a profile of users (authentication required).
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: authenticate successful. Returns the users profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  room_number:
 *                    type: string
 *                    example: "9901"
 *                  reservation_status:
 *                    type: string
 *                    example: "Approve"
 *                  status_count:
 *                    type: string
 *                    example: "1"
 *       401:
 *         description: No token provided , Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: No token provided , Invalid token
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

router.get('/getreserveddata', authMiddleware.isAdmin, dashboardController.getreserveddata);

module.exports = router;