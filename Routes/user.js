const express = require('express');
const userController = require('../Controller/user');
const authenticateMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/signup', userController.Signup);
router.post('/login', userController.login);
router.get('/getusers', userController.getUser);

module.exports = router;