const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    res.send('<BODY><FORM action="/" method="POST" onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)"><input type="text" name="username" id="username"><button type="submit">Login</button></FORM></BODY>');
})

module.exports = router;