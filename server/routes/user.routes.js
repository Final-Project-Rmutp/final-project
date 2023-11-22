const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');

/**
 * @swagger
 * /user/getuser:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

router.get('/getuser', userController.getallusers);
router.get('/current', userController.getCurrentUser);

module.exports = router;