const http = require('http');
const express = require('express');
const app = express();
const loginPage = require('./Chat app/login')
const homePage = require('./Chat app/home')
app.use(homePage);
app.use(loginPage);
app.listen(3000);