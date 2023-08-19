const sendEmailController = require('../controllers/Passwordreset');

const express = require('express');

const router = express.Router();

router.post('/forgotpassword', sendEmailController.sendMail);

module.exports = router;