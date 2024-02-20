const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const classController = require('../controller/class.controller.js');

/**
 * @swagger
 * /class/getClassSchedule:
 *   get:
 *     tags:
 *       - Admin - class
 *     summary: Get class schedule for rooms
 *     description: Retrieve the class schedule for rooms.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         description: User ID to fetch
 *         schema:
 *           type: string
 *       - in: query
 *         name: room_numner
 *         description: Room number
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response. Returns the class schedule for rooms.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room_number:
 *                   type: object
 *                   properties:
 *                     Monday:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subject_name:
 *                             type: string
 *                             example: "BB"
 *                           start_time:
 *                             type: string
 *                             format: time
 *                             example: "08:00:00"
 *                           end_time:
 *                             type: string
 *                             format: time
 *                             example: "09:00:00"
 *                     Tuesday:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subject_name:
 *                             type: string
 *                             example: "BB"
 *                           start_time:
 *                             type: string
 *                             format: time
 *                             example: "08:00:00"
 *                           end_time:
 *                             type: string
 *                             format: time
 *                             example: "09:00:00"
 *                     Wednesday:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subject_name:
 *                             type: string
 *                             example: "BB"
 *                           start_time:
 *                             type: string
 *                             format: time
 *                             example: "08:00:00"
 *                           end_time:
 *                             type: string
 *                             format: time
 *                             example: "09:00:00"
 *                     Thursday:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subject_name:
 *                             type: string
 *                             example: "BB"
 *                           start_time:
 *                             type: string
 *                             format: time
 *                             example: "08:00:00"
 *                           end_time:
 *                             type: string
 *                             format: time
 *                             example: "09:00:00"
 *                     Friday:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subject_name:
 *                             type: string
 *                             example: "BB"
 *                           start_time:
 *                             type: string
 *                             format: time
 *                             example: "08:00:00"
 *                           end_time:
 *                             type: string
 *                             format: time
 *                             example: "09:00:00"
 *                     Saturday:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subject_name:
 *                             type: string
 *                             example: "BB"
 *                           start_time:
 *                             type: string
 *                             format: time
 *                             example: "08:00:00"
 *                           end_time:
 *                             type: string
 *                             format: time
 *                             example: "09:00:00"
 *                     Sunday:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subject_name:
 *                             type: string
 *                             example: "BB"
 *                           start_time:
 *                             type: string
 *                             format: time
 *                             example: "08:00:00"
 *                           end_time:
 *                             type: string
 *                             format: time
 *                             example: "09:00:00"
 *               example:
 *                 9901:
 *                   Monday: []
 *                   Tuesday: []
 *                   Wednesday:
 *                     - subject_name: "BB"
 *                       start_time: "08:00:00"
 *                       end_time: "09:00:00"
 *                   Thursday: []
 *                   Friday: []
 *                   Saturday: []
 *                   Sunday: []
 *                 9902:
 *                   Monday:
 *                     - subject_name: "BB"
 *                       start_time: "08:00:00"
 *                       end_time: "09:00:00"
 *                   Tuesday: []
 *                   Wednesday: []
 *                   Thursday: []
 *                   Friday: []
 *                   Saturday: []
 *                   Sunday: []
 *       401:
 *         description: No token provided, Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No token provided, Invalid token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


router.get('/getClassSchedule', authMiddleware.isAdmin, classController.getClassSchedule);

/**
 * @swagger
 * /class/addclass:
 *   post:
 *     tags:
 *     - Admin - class
 *     summary: Create a new Class (authentication required).
 *     description: Create a new Class by providing Class information.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject_id:
 *                 type: string
 *                 example: "1"
 *               day_of_week:
 *                 type: string
 *                 example: "Monday"
 *               start_time:
 *                 type: string
 *                 example: "08:00"
 *               end_time:
 *                 type: string
 *                 example: "09:00"
 *               room_id:
 *                 type: string
 *                 example: "1"
 *             required:
 *               - subject_id
 *               - day_of_week
 *               - start_time
 *               - end_time
 *               - room_id
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

router.post("/addclass", authMiddleware.isAdmin, classController.addclass);

/**
 * @swagger
 * /class/deleteclass/{class_id}:
 *   delete:
 *     tags:
 *     - Admin - class
 *     summary: Delete room (authentication required).
 *     description: Delete room .
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: class_id
 *         required: true
 *         description: Room ID to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Class deleted successfully
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

router.delete("/deleteclass/:class_id", authMiddleware.isAdmin, classController.deleteclass);

/**
 * @swagger
 * /class/updateclass/{class_id}:
 *   patch:
 *     tags:
 *     - Admin - class
 *     summary: Edit user information (authentication required).
 *     description: Edit user information.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: class_id
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
 *               subject_id:
 *                 type: string
 *                 example: "1"
 *               day_of_week:
 *                 type: string
 *                 example: "Monday"
 *               start_time:
 *                 type: string
 *                 example: "08:00"
 *               end_time:
 *                 type: string
 *                 example: "09:00"
 *             required:
 *               - subject_id
 *               - day_of_week
 *               - start_time
 *               - end_time
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

router.patch("/updateclass/:class_id", authMiddleware.isAdmin, classController.updateclass);


//////////////////////////////////////////////////////
router.post('/createclass/test', authMiddleware.isAdmin,classController.createClassTest);
router.get('/getschedule', authMiddleware.isAdmin,classController.getSchedule);
//////////////////////////////////////////////////////
module.exports = router;