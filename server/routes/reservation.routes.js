const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const reservationController = require('../controller/reservation.controller.js');

/**
 * @swagger
 * /reservation/getroomschedule:
 *   get:
 *     tags:
 *     - TEST
 *     summary: Get users Profile (authentication required)
 *     description: Retrieve a profile of users (authentication required).
 *     parameters:
 *       - in: query
 *         name: room_id
 *         description: "Room ID to fetch"
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: weeks
 *         description: "Nunber of week"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: authenticate successful. Returns the users profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  firstname:
 *                    type: string
 *                    example: "admin"
 *                  user_img_path:
 *                    type: string
 *                    example: "null"
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

router.get('/getroomschedule', reservationController.getRoomSchedule);

module.exports = router;