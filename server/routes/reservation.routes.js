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

/**
 * @swagger
 * /reservation/searchroom:
 *   post:
 *     tags:
 *     - Reservation
 *     summary: Register a new user (authentication required).
 *     description: Create a new user account by providing user information and an image file.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_capacity:
 *                 type: string
 *                 example: "30"
 *               room_level:
 *                 type: string
 *                 example: "9"
 *               room_type:
 *                 type: string
 *                 example: "ห้องปฏิบัติการ"
 *               room_number:
 *                 type: string
 *                 example: "9901"
 *               reservation_date:
 *                 type: string
 *                 example: "2024-01-22"
 *               start_time:
 *                 type: string
 *                 example: "08:00:00"
 *               end_time:
 *                 type: string
 *                 example: "09:00:00"
 *     responses:
 *       201:
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: User registration successful.
 *       400:
 *         description: Bad request (e.g., missing or invalid input data)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Bad request (e.g., missing or invalid input data)
 *       401:
 *         description: No token provided/Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: No token provided/Invalid token
 *       403:
 *         description: You don't have permission to access this resource.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: You don't have permission to access this resource.
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

router.post("/searchroom", reservationController.searchroom);

/**
 * @swagger
 * /reservation/reserve:
 *   post:
 *     tags:
 *     - Reservation
 *     summary: Create a new room (authentication required).
 *     description: Create a new room by providing room information.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_id:
 *                 type: string
 *                 example: "1"
 *               reservation_date:
 *                 type: string
 *                 example: "2024-01-23"
 *               start_time:
 *                 type: string
 *                 example: "08:00"
 *               end_time:
 *                 type: string
 *                 example: "09:00"
 *               reservation_reason:
 *                 type: string
 *                 example: "TEST"
 *             required:
 *               - room_id
 *               - reservation_date
 *               - start_time
 *               - end_time
 *               - reservation_reason
 *     responses:
 *       201:
 *         description: Room additional successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Room additional successful.
 *       400:
 *         description: Bad request (e.g., missing or invalid input data)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Bad request (e.g., missing or invalid input data)
 *       401:
 *         description: No token provided/Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: No token provided/Invalid token
 *       403:
 *         description: You don't have permission to access this resource.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: You don't have permission to access this resource.
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

router.post("/reserve", authMiddleware.authenticateToken, reservationController.reservation);

/**
 * @swagger
 * /reservation/getreservation:
 *   get:
 *     tags:
 *     - Reservation
 *     summary: Get users Profile (authentication required)
 *     description: Retrieve a profile of users (authentication required).
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *           description: The page number to retrieve
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 100
 *           description: Number of items per page
 *     responses:
 *       200:
 *         description: authenticate successful. Returns the users profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  fullname:
 *                    type: string
 *                    example: "admin admin"
 *                  account_type:
 *                    type: string
 *                    example: "teacher"
 *                  room_number:
 *                    type: string
 *                    example: "9901"
 *                  reservation_reason:
 *                    type: string
 *                    example: "TEST"
 *                  reservation_status:
 *                    type: string
 *                    example: "in progress"
 *                  reservation_date:
 *                    type: string
 *                    example: "2024-01-24T17:00:00.000Z"
 *                  timestamp:
 *                    type: string
 *                    example: "2024-01-22T19:52:38.128Z"
 *                  start_time:
 *                    type: string
 *                    example: "08:00:00"
 *                  end_time:
 *                    type: string
 *                    example: "09:00:00"
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

router.get('/getreservation', authMiddleware.isAdmin, reservationController.getreservation);

module.exports = router;