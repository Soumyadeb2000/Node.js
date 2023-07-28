const express = require('express')
const router = express.Router();

router.get('/login', (req, res, next) => {
    res.send('<form onsubmit="localStorage.setItem(`loginData`, document.getElementById(`loginData`).value)" action="/" method="POST"><input type="text" id="loginData" name="loginData"><br><button type="submit">Login</button></form>')
})


module.exports = router;