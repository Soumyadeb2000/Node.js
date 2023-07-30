const http = require('http');
const path = require('path');
const express = require('express');
const adminRoute = require('./Routes/admin')
const shopRoute = require('./Routes/shop');
const app = express();
const bodyparser = require('body-parser');
const rootDir = require('./util/path.js');
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoute);

app.use('/', shopRoute);

app.use((req, res, next) => {
    res.status(404);
    res.sendFile(path.join(rootDir, 'views', 'error.html'));
})

app.listen(3000);