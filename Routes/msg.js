const express = require('express');
const msgController = require('../Controller/message');
const authenticateMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/msg', authenticateMiddleware.authenticate, msgController.sendmsg);
router.get('/getmsg',authenticateMiddleware.authenticate, msgController.getMsg);

module.exports = router;