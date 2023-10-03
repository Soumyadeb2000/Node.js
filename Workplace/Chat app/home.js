const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const fs = require('fs');

router.use(bodyparser.urlencoded({extended: false}));

router.get('/', (req, res, next) => {
    res.send(`${fs.readFileSync('chat.txt', 'utf8')} <br> <form onsubmit="document.getElementById('name').value = localStorage.getItem('username')" action="/" method="POST"><input type="text" name="message" id"message"><input type="hidden" name="name" id="name"><button type="submit">Send</button></form>`)
})

router.post('/', (req, res, next) => {
    if(req.body.name != undefined || req.body.message != undefined)
    fs.appendFileSync('chat.txt',`${req.body.name}: ${req.body.message} `);
    res.redirect('/');
}) 

module.exports = router;