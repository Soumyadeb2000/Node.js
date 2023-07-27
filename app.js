const http = require('http');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));

app.use('/add-product',(req,res,next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="number" name="quantity"><button type="submit">Add</button></form>')
});

app.use('/product',(req,res,next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/',(req,res,next) => {
    res.send('<h1>Hello from Server</h1>');
});

app.listen(3000);