const http = require('http');
const express  = require('express');
const app = express();
const server = http.createServer(app);
app.use((req, res, next) => {
    console.log('Hello from Middleware');
    next();
})
app.use((req, res, next) => {
    console.log('Hello from another Middleware');
})
app.listen(3000);