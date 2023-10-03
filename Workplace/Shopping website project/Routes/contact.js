const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../Util/path.js');
router.get('/contactus', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contact-us.html'));
});

router.post('/contact-us', (req, res, next) => {
    res.redirect('/success');

})



module.exports = router;