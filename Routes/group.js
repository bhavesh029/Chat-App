const express = require('express');
const grpController = require('../Controller/group');
const authenticateMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/creategrp', authenticateMiddleware.authenticate, grpController.createGroup);
router.post('/getgrps',authenticateMiddleware.authenticate, grpController.getGroup);

module.exports = router;