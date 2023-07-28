const http = require('http');

const express = require('express');

const adminRoute = require('./Routes/admin')

const shopRoute = require('./Routes/shop')
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));

app.use('/admin', adminRoute);

app.use('/shop', shopRoute);

app.use((req, res, next) => {
    res.status(404).send("Page not found");
})

app.listen(3000);