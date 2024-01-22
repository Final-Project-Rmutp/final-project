const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js')
const reportController = require('../controller/report.controller.js')

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

router.get('/getprofile', authMiddleware.authenticateToken , userController.getprofile);

/**
 * @swagger
 * /user/room/report:
 *   post:
 *     tags:
 *     - User - report
 *     summary: Create a new report (authentication required).
 *     description: Create a new report with infomation.
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
 *               report_detail:
 *                 type: string
 *                 example: "ห้องนี้มีขยะที่พื้น"
 *             required:
 *               - room_id
 *               - report_detail
 *     responses:
 *       201:
 *         description: Reported successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Reported successful.
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

router.post("/room/report", authMiddleware.authenticateToken, reportController.ReportRoom );

/**
 * @swagger
 * /user/getreport:
 *   get:
 *     tags:
 *     - User - report
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

router.get('/getreport', authMiddleware.authenticateToken , reportController.getreport);

/**
 * @swagger
 * /user/getschedule:
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

router.get('/getschedule', authMiddleware.isTeacher , userController.getschedule);

module.exports = router;