const http = require('http');
const express = require('express');

const app = express();
const login = require('./Chat app/login.js')
const home = require('./Chat app/home.js')


app.use(home);
app.use(login);

app.listen(3000);