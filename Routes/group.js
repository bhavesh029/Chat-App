const express = require('express');
const grpController = require('../Controller/group');
const authenticateMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/creategrp', authenticateMiddleware.authenticate, grpController.createGrp);
router.get('/getgrps', authenticateMiddleware.authenticate, grpController.getGrps);

module.exports = router;