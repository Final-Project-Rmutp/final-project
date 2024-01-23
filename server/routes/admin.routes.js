const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const roomController = require("../controller/room.controller.js");
const reportController = require('../controller/report.controller.js')
const uploadMiddleware = require('../middleware/uploadMiddleware.js')

/**
 * @swagger
 * /admin/user/add:
 *   post:
 *     tags:
 *     - Admin - user
 *     summary: Register a new user (authentication required).
 *     description: Create a new user account by providing user information and an image file.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pin:
 *                 type: string
 *                 example: "000000000000-0"
 *               citizen_id:
 *                 type: string
 *                 example: "1119900000000"
 *               firstname:
 *                 type: string
 *                 example: "user"
 *               lastname:
 *                 type: string
 *                 example: "user"
 *               account_type:
 *                 type: string
 *                 example: "student"
 *               image:
 *                 type: string
 *                 format: binary   # Specify the format as binary for file uploads
 *             required:
 *               - pin
 *               - citizen_id
 *               - firstname
 *               - lastname
 *               - account_type
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

router.post("/user/add", authMiddleware.isAdmin, uploadMiddleware.uploadToS3, uploadMiddleware.handleS3Upload, adminController.adduser,);

/**
 * @swagger
 * /admin/user/getalluser:
 *   get:
 *     tags:
 *     - Admin - user
 *     summary: Get all users (authentication required)
 *     description: Retrieve a list of all users (authentication required).
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
 *         description: authenticate successful. Returns the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                    type: string
 *                    example: 1
 *                  firstname:
 *                    type: string
 *                    example: user
 *                  lastname:
 *                    type: string
 *                    example: user
 *                  citizen_id:
 *                    type: string
 *                    example: 1119900000000
 *                  pin:
 *                    type: string
 *                    example: 056000000000-0
 *                  account_type:
 *                    type: string
 *                    example: student
 *                  user_img_path:
 *                    type: string
 *                    example: /uploads/user123.jpg can be null
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

router.get("/user/getalluser", authMiddleware.isAdmin, adminController.getallusers);

/**
 * @swagger
 * /admin/user/getuser/{id}:
 *   get:
 *     tags:
 *     - Admin - user
 *     summary: Get all users (authentication required)
 *     description: Retrieve a list of all users (authentication required).
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: authenticate successful. Returns the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                    type: string
 *                    example: 1
 *                  firstname:
 *                    type: string
 *                    example: user
 *                  lastname:
 *                    type: string
 *                    example: user
 *                  citizen_id:
 *                    type: string
 *                    example: 1119900000000
 *                  pin:
 *                    type: string
 *                    example: 056000000000-0
 *                  account_type:
 *                    type: string
 *                    example: student
 *                  user_img_path:
 *                    type: string
 *                    example: /uploads/user123.jpg can be null
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

router.get("/user/getuser/:id", authMiddleware.isAdmin, adminController.getUserById);

/**
 * @swagger
 * /admin/user/deactivateUser/{id}:
 *   delete:
 *     tags:
 *     - Admin - user
 *     summary: DeactivateUser a user (authentication required).
 *     description: DeactivateUser new user account by user id.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: User deleted successfully
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: User not found
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

router.delete("/user/deactivateUser/:id", authMiddleware.isAdmin, adminController.deactivateUser);

/**
 * @swagger
 * /admin/user/updateuser/{id}:
 *   patch:
 *     tags:
 *     - Admin - user
 *     summary: Edit user information (authentication required).
 *     description: Edit user information.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to fetch
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pin:
 *                 type: string
 *               citizen_id:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary   # Specify the format as binary for file uploads
 *             required:
 *               - pin
 *               - citizen_id
 *               - firstname
 *               - lastname
 *     responses:
 *       200:
 *         description: User Edit successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: User Edit successfully
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: User not found
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

router.patch("/user/updateuser/:id", authMiddleware.isAdmin, uploadMiddleware.uploadToS3, uploadMiddleware.handleS3Upload, adminController.updateUser);

/**
 * @swagger
 * /admin/user/search:
 *   post:
 *     tags:
 *     - Admin - user
 *     summary: Search user data (authentication required).
 *     description: Retrieve a data of users (authentication required).
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: string
 *                 example: "000000000000-0"
 *     responses:
 *       200:
 *         description: authenticate successful. Returns the list of users.
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

router.post("/user/search", authMiddleware.isAdmin, adminController.searchuser);

/**
 * @swagger
 * /admin/room/add:
 *   post:
 *     tags:
 *     - Admin - room
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
 *               room_number:
 *                 type: string
 *                 example: "9901"
 *               room_level:
 *                 type: string
 *                 example: "9"
 *               room_capacity:
 *                 type: string
 *                 example: "30"
 *               room_type:
 *                 type: string
 *                 example: "ห้องปฏิบัติการ"
 *               facilities_id:
 *                 type: string
 *                 example: [1]
 *             required:
 *               - room_number
 *               - room_level
 *               - room_capacity
 *               - room_type
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

router.post("/room/add", authMiddleware.isAdmin, roomController.addroom);

/**
 * @swagger
 * /admin/room/getallroom:
 *   get:
 *     tags:
 *     - Admin - room
 *     summary: Get all users (authentication required)
 *     description: Retrieve a list of all users (authentication required).
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
 *         description: authenticate successful. Returns the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  room_id:
 *                    type: string
 *                    example: 1
 *                  room_number:
 *                    type: string
 *                    example: "9901"
 *                  room_type:
 *                    type: string
 *                    example: "ห้องปฏิบัติการ"
 *                  room_capacity:
 *                    type: string
 *                    example: 30
 *                  room_level:
 *                    type: string
 *                    example: 9
 *                  room_facilities:
 *                    type: string
 *                    example: ["computer","projector"]
 *                  room_status:
 *                    type: string
 *                    example: 1
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

router.get("/room/getallroom", authMiddleware.isAdmin, roomController.getallroom);

/**
 * @swagger
 * /admin/room/getroom/{room_id}:
 *   get:
 *     tags:
 *     - Admin - room
 *     summary: Get all users (authentication required)
 *     description: Retrieve a list of all users (authentication required).
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: room_id
 *         required: true
 *         description: Room ID to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: authenticate successful. Returns the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  room_id:
 *                    type: string
 *                    example: 1
 *                  room_number:
 *                    type: string
 *                    example: "9901"
 *                  room_type:
 *                    type: string
 *                    example: "ห้องปฏิบัติการ"
 *                  room_capacity:
 *                    type: string
 *                    example: 30
 *                  room_level:
 *                    type: string
 *                    example: 9
 *                  facilities_id:
 *                    type: string
 *                    example: ["computer","projector"]
 *                  room_status:
 *                    type: string
 *                    example: 1
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

router.get("/room/getroom/:room_id", authMiddleware.isAdmin, roomController.getroomById);

/**
 * @swagger
 * /admin/room/updateroom/{room_id}:
 *   patch:
 *     tags:
 *     - Admin - room
 *     summary: Edit room information (authentication required).
 *     description: Edit room information.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: room_id
 *         required: true
 *         description: Room ID to fetch
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_number:
 *                 type: string
 *                 example: "9901"
 *               room_type:
 *                 type: string
 *                 example: "ห้องปฏิบัติการ"
 *               room_capacity:
 *                 type: string
 *                 example: "30"
 *               room_level:
 *                 type: string
 *                 example: "9"
 *               room_status:
 *                 type: string
 *                 example: "1"
 *               facilities_id:
 *                 type: string
 *                 example: [1]
 *             required:
 *               - room_id
 *               - room_number
 *               - room_type
 *               - room_capacity
 *               - facilities_id
 *               - room_level
 *               - room_status
 *     responses:
 *       200:
 *         description: Room data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Room data updated successfully
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
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Room not found
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

router.patch("/room/updateroom/:room_id", authMiddleware.isAdmin, roomController.updateroom);

/**
 * @swagger
 * /admin/room/deleteroom/{room_id}:
 *   delete:
 *     tags:
 *     - Admin - room
 *     summary: Delete room (authentication required).
 *     description: Delete room .
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: room_id
 *         required: true
 *         description: Room ID to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Room Delete successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Room Delete successfully
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
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Room not found
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

router.delete("/room/deleteroom/:room_id", authMiddleware.isAdmin, roomController.deleteroom);

/**
 * @swagger
 * /admin/getreport:
 *   get:
 *     tags:
 *     - Admin - report
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
 *                  report_id:
 *                    type: string
 *                    example: "1"
 *                  room_number:
 *                    type: string
 *                    example: "9901"
 *                  fullname:
 *                    type: string
 *                    example: "User User"
 *                  report_detail:
 *                    type: string
 *                    example: "NULL"
 *                  report_status:
 *                    type: string
 *                    example: "1"
 *                  timestamp:
 *                    type: string
 *                    example: "2024-01-09T01:39:40.260Z"
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

router.get('/getreport', authMiddleware.isAdmin , reportController.getallreports);

/**
 * @swagger
 * /admin/updatereportstatus/{report_id}:
 *   patch:
 *     tags:
 *     - Admin - report
 *     summary: Edit user information (authentication required).
 *     description: Edit user information.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: report_id
 *         required: true
 *         description: User ID to fetch
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               report_status:
 *                 type: string
 *                 example: "0"
 *             required:
 *               - report_status
 *     responses:
 *       200:
 *         description: report Edit successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: report Edit successfully
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: User not found
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

router.patch("/updatereportstatus/:report_id", authMiddleware.isAdmin, reportController.updatereportstatus);

// /**
//  * @swagger
//  * /admin/uploads:
//  *   post:
//  *     tags:
//  *     - TEST
//  *     summary: Register a new user (authentication required).
//  *     description: Create a new user account by providing user information and an image file.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               image:
//  *                 type: string
//  *                 format: binary   # Specify the format as binary for file uploads
//  *     responses:
//  *       201:
//  *         description: User registration successful.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  message:
//  *                    type: string
//  *                    example: User registration successful.
//  *       400:
//  *         description: Bad request (e.g., missing or invalid input data)
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  message:
//  *                    type: string
//  *                    example: Bad request (e.g., missing or invalid input data)
//  *       401:
//  *         description: No token provided/Invalid token
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  message:
//  *                    type: string
//  *                    example: No token provided/Invalid token
//  *       403:
//  *         description: You don't have permission to access this resource.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  message:
//  *                    type: string
//  *                    example: You don't have permission to access this resource.
//  *       500:
//  *         description: Internal server error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                  message:
//  *                    type: string
//  *                    example: Internal server error
//  */

// router.post('/uploads', authMiddleware.isAdmin, uploadMiddleware.uploadToS3, uploadMiddleware.handleS3Upload, (req, res) => {res.json({ imageUrl: req.uploadedFileUrl });});

/**
 * @swagger
 * /admin/subject/addsubject:
 *   post:
 *     tags:
 *     - Admin - subject
 *     summary: Create a new subject (authentication required).
 *     description: Create a new subject by providing subject information.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject_name:
 *                 type: string
 *                 example: "Math"
 *               subject_code:
 *                 type: string
 *                 example: "ST212224236"
 *               user_id:
 *                 type: string
 *                 example: "1"
 *             required:
 *               - subject_name
 *               - subject_code
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

router.post("/subject/addsubject", authMiddleware.isAdmin, adminController.addsubject);

/**
 * @swagger
 * /admin/subject/getallsubject:
 *   get:
 *     tags:
 *     - Admin - subject
 *     summary: Get all subject (authentication required)
 *     description: Retrieve a list of all subjects (authentication required).
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
 *         description: authenticate successful. Returns the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  subject_id:
 *                    type: string
 *                    example: 1
 *                  subject_name:
 *                    type: string
 *                    example: "Mathematics"
 *                  subject_code:
 *                    type: string
 *                    example: "MATH101"
 *                  user_id:
 *                    type: string
 *                    example: "123"
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

router.get("/subject/getallsubject", authMiddleware.isAdmin, adminController.getallsubject);

/**
 * @swagger
 * /admin/subject/getbyid/{subject_id}:
 *   get:
 *     tags:
 *     - Admin - subject
 *     summary: Get subject by subject_id (authentication required)
 *     description: Retrieve subject details by subject_id (authentication required).
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: subject_id
 *         required: true
 *         description: Subject ID to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful. Returns the subject details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  subject_id:
 *                    type: string
 *                    example: 1
 *                  subject_name:
 *                    type: string
 *                    example: "Mathematics"
 *                  subject_code:
 *                    type: string
 *                    example: "MATH101"
 *                  user_id:
 *                    type: string
 *                    example: "123"
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
 *       404:
 *         description: Subject not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Subject not found
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

router.get("/subject/getbyid/:subject_id", authMiddleware.isAdmin, adminController.getSubjectById);

/**
 * @swagger
 * /admin/subject/deletesubject/{subject_id}:
 *   delete:
 *     tags:
 *     - Admin - subject
 *     summary: Delete subject (authentication required).
 *     description: Delete subject .
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: subject_id
 *         required: true
 *         description: Subject ID to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Room Delete successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Room Delete successfully
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
 *       404:
 *         description: Subject not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Subject not found
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

router.delete("/subject/deletesubject/:subject_id", authMiddleware.isAdmin, adminController.deleteSubjectById);

/**
 * @swagger
 * /admin/room/getroomlevel/{roomlevel_id}:
 *   get:
 *     tags:
 *     - Admin - RoomGET
 *     summary: Get roomlevel by roomlevel_id (authentication required)
 *     description: Retrieve roomlevel details by roomlevel_id (authentication required).
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Successful. Returns the roomlevel details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  roomlevel_id:
 *                    type: string
 *                    example: 1
 *                  roomlevel_name:
 *                    type: string
 *                    example: "Mathematics"
 *                  roomlevel_code:
 *                    type: string
 *                    example: "MATH101"
 *                  user_id:
 *                    type: string
 *                    example: "123"
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
 *       404:
 *         description: Roomlevel not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Roomlevel not found
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

router.get("/room/getroomlevel/:roomlevel_id", authMiddleware.isAdmin, roomController.getroomlevel);

/**
 * @swagger
 * /admin/room/getroomnumber/{roomnumber_id}:
 *   get:
 *     tags:
 *     - Admin - RoomGET
 *     summary: Get roomnumber by roomnumber_id (authentication required)
 *     description: Retrieve roomnumber details by roomnumber_id (authentication required).
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Successful. Returns the roomnumber details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  roomnumber_id:
 *                    type: string
 *                    example: 1
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
 *       404:
 *         description: Roomlevel not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Roomlevel not found
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

router.get("/room/getroomnumber/:roomnumber_id", authMiddleware.isAdmin, roomController.getroomnumber);

/**
 * @swagger
 * /admin/room/getroomtype/{roomtype_id}:
 *   get:
 *     tags:
 *     - Admin - RoomGET
 *     summary: Get roomtype by roomtype_id (authentication required)
 *     description: Retrieve roomtype details by roomtype_id (authentication required).
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Successful. Returns the roomtype details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  roomtype_id:
 *                    type: string
 *                    example: 1
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
 *       404:
 *         description: Roomlevel not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Roomlevel not found
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

router.get("/room/getroomtype/:roomtype_id", authMiddleware.isAdmin, roomController.getroomtype);

module.exports = router;
