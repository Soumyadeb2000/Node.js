const express = require('express');
const fs = require('fs')
const router = express.Router();
const bodyparser = require('body-parser');
const data = [];
router.use(bodyparser.urlencoded({extended: false}))

router.get('/', (req, res, next) => {
    let message = fs.readFileSync('./Chat app/message.txt', 'utf8');
    if(message === 'undefined: undefined'){
    res.send(`<body>No Message<br><form onsubmit="getElementById('username').value = localStorage.getItem('loginData')" action="/" method="POST"><input type="text" name="chatData"><input type="hidden" name="username" id="username"><br><button type="submit">Send</button></form></body>`);
    message="";
    }
    res.send(`<body>${message} <br><form onsubmit="getElementById('username').value = localStorage.getItem('loginData')" action="/" method="POST"><input type="text" name="chatData"><input type="hidden" name="username" id="username"><br><button type="submit">Send</button></form></body>`);
})

router.post('/', (req, res, next) => {
    if(req.body.chatData != undefined && req.body.chatData != null){
    data.push(`${req.body.username}: ${req.body.chatData}`);
    fs.writeFileSync('./Chat app/message.txt', data.toString())
    }
    res.redirect('/');
})

module.exports = router;