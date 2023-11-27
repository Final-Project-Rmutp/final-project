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
 *         description: User registration successful.
 *       400:
 *         description: Bad request (e.g., missing or invalid input data)
 *       401:
 *         description: No token provided/Invalid token
 *       403:
 *         description: You don't have permission to access this resource.
 *       500:
 *         description: Internal server error
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
 *       401:
 *         description: No token provided/Invalid token
 *       403:
 *         description: You don't have permission to access this resource.
 *       500:
 *         description: Internal server error
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
 *       401:
 *         description: No token provided/Invalid token
 *       403:
 *         description: You don't have permission to access this resource.
 *       500:
 *         description: Internal server error
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
 *         description: User account deactivated successfully
 *       401:
 *         description: No token provided/Invalid token
 *       403:
 *         description: You don't have permission to access this resource.
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
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
 *               id:
 *                 type: string
 *               citizen_id:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *             required:
 *               - id
 *               - citizen_id
 *               - firstname
 *               - lastname
 *     responses:
 *       200:
 *         description: User data updated successfully.
 *       400:
 *         description: Bad request (e.g., missing or invalid input data)
 *       401:
 *         description: No token provided/Invalid token
 *       403:
 *         description: You don't have permission to access this resource.
 *       500:
 *         description: Internal server error
 */

router.patch('/user/updateuser/:id',authMiddleware.isAdmin, adminController.updateUser);

module.exports = router;