/**
 * @swagger
 * tags:
 *   name: auth
 *   description: APIs for user authentication
 *
 * /auth/login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *
 * /auth/logout:
 *   get:
 *     summary: Logout a user
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *
 * @swagger
 * tags:
 *   name: user
 *   description: APIs for managing users
 */
