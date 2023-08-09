const router = require('./routes/admin');

const sequelize = require('./utils/database');

const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json({extended: false}));

app.use(router);

sequelize.sync()
.then(() => {
    console.log('Server online');
    app.listen(3000);
})
.catch((err) => {
    console.log(err);
})


