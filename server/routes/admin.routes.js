const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js')

/**
 * @swagger
 * /admin/user/add:
 *   post:
 *     tags:
 *     - Admin
 *     summary: Register a new user
 *     description: Create a new user account by providing user information.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pin:
 *                 type: string
 *                 example: "056000000000-0"
 *               citizen_id:
 *                 type: string
 *                 example: "1119900000000"
 *               firstname:
 *                 type: string
 *                 example: "user"
 *               lastname:
 *                 type: string
 *                 example: "user"
 *               accounttype:
 *                 type: string
 *                 example: "user"
 *               user_img_path:
 *                 type: string
 *                 example: ""
 *             required:
 *               - pin
 *               - citizen_id
 *               - firstname
 *               - lastname
 *               - accounttype
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

router.post('/user/add',authMiddleware.isAdmin, adminController.adduser);

/**
 * @swagger
 * /admin/user/getalluser:
 *   get:
 *     tags:
 *     - Admin
 *     summary: Get all users (authentication required)
 *     description: Retrieve a list of all users (authentication required).
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: authenticate successful. Returns the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  pin:
 *                    type: string
 *                    example: 056000000000-0
 *                  citizen_id:
 *                    type: string
 *                    example: 1119900000000
 *                  firstname:
 *                    type: string
 *                    example: user
 *                  lastname:
 *                    type: string
 *                    example: user
 *                  accounttype:
 *                    type: string
 *                    example: user / admin
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


router.get('/user/getalluser',authMiddleware.isAdmin, adminController.getallusers);

/**
 * @swagger
 * /admin/user/getuser/{id}:
 *   get:
 *     tags:
 *     - Admin
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


router.get('/user/getuser/:id',authMiddleware.isAdmin, adminController.getUserById);

/**
 * @swagger
 * /admin/user/deactivateUser/{id}:
 *   delete:
 *     tags:
 *     - Admin
 *     summary: DeactivateUser a user
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

router.delete('/user/deactivateUser/:id',authMiddleware.isAdmin, adminController.deactivateUser);

/**
 * @swagger
 * /admin/user/updateuser/{id}:
 *   patch:
 *     tags:
 *     - Admin
 *     summary: Edit user information
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
 *         application/json:
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

router.patch('/user/updateuser/:id',authMiddleware.isAdmin, adminController.updateUser);

module.exports = router;