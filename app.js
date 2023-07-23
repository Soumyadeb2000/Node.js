const http = require('http');

const server = http.createServer((req,res) => console.log('Soumyadeb'));

server.listen(3000);